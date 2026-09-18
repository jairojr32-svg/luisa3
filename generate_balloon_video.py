import os
import time
from google import genai
from google.genai import types
from PIL import Image

def generate_video():
    api_key = "AIzaSyCkihQzCRyS1TVXMYnSwWG3BJQroaD8LJU"
    client = genai.Client(api_key=api_key)
    
    # 3 High-quality reference images from fotobalao to capture the exact design and angles of the original balloon
    ref_paths = [
        "fotobalao/20260317_072706.jpg.jpeg",
        "fotobalao/20260317_072745.jpg.jpeg",
        "fotobalao/20260317_072937.jpg.jpeg"
    ]
    
    # Stitch the three reference images side-by-side using Pillow to give the AI a complete multi-angle blueprint of the real balloon
    combined_ref_path = "combined_ref.jpg"
    print("Stitching multiple reference images horizontally for complete design context...")
    try:
        images = [Image.open(p) for p in ref_paths]
        
        # Resize images to have a uniform height of 1000px while keeping aspect ratio
        h_target = 1000
        resized_images = []
        for img in images:
            w_new = int(img.width * h_target / img.height)
            resized_images.append(img.resize((w_new, h_target), Image.Resampling.LANCZOS))
            
        # Combine side-by-side
        total_w = sum(img.width for img in resized_images)
        combined_img = Image.new("RGB", (total_w, h_target))
        
        current_x = 0
        for img in resized_images:
            combined_img.paste(img, (current_x, 0))
            current_x += img.width
            
        combined_img.save(combined_ref_path, "JPEG", quality=95)
        print(f"Stitched multi-angle blueprint saved to {combined_ref_path}")
    except Exception as e:
        print(f"Failed to stitch reference images: {e}")
        return

    # Load combined image for the SDK
    try:
        ref_image = types.Image.from_file(location=combined_ref_path)
    except Exception as e:
        print(f"Failed to load stitched image for SDK: {e}")
        return

    # Prompt engineered for absolute photorealism, framing the entire balloon and basket cleanly in 4K resolution
    prompt = (
        "The reference image shows three different views of the exact same custom hot air balloon. "
        "Use these views as a perfect blueprint to recreate an identical, 100% photorealistic, 4K resolution, "
        "highly detailed, cinematic vertical 9:16 video of this exact balloon rising into the sky. "
        "The entire, complete balloon envelope and basket must be fully visible and perfectly centered in "
        "a majestic medium-wide shot, with absolutely no parts of the balloon or basket cropped, truncated, "
        "or cut off at the top, bottom, or sides. The hot air balloon is rising gracefully over the endless "
        "white salt flat of Salar de Uyuni during a breathtaking sunrise. The S-curve vertical panels are pastel "
        "pink, off-white, pastel blue, pastel green, pastel yellow, matching the images exactly. "
        "Near the base, the words 'Magic happens' are written in a thin cursive signature font. Near the top, 'PS-UYU' is visible. "
        "The lighting is golden hour dawn, creating majestic reflections on the wet, mirror-like salt flat below. "
        "The video has flawless 3D physical movement, clean details, and professional-grade camera panning."
    )

    print("Submitting 4K video generation request to Google Veo 3.1 (High Quality Model)...")
    try:
        # We submit to the high-fidelity model 'veo-3.1-generate-preview' for 4K quality and high realism
        operation = client.models.generate_videos(
            model="veo-3.1-generate-preview",
            prompt=prompt,
            image=ref_image, # Pass the stitched multi-angle image reference
            config=types.GenerateVideosConfig(
                number_of_videos=1,
                aspect_ratio="9:16", # Vertical ratio for scrolling background
                resolution="4k"     # Ultra High Definition 4K
            )
        )
        print(f"Request accepted! Operation Name: {operation.name}")
    except Exception as e:
        print(f"Error submitting generation request: {e}")
        return

    # Polling loop to wait for completion
    print("Waiting for 4K video generation (may take 2-4 minutes for 4K quality)...")
    start_time = time.time()
    while not operation.done:
        elapsed = time.time() - start_time
        print(f"[{elapsed:.1f}s] 4K video generation in progress...")
        time.sleep(20)
        try:
            operation = client.operations.get(operation)
        except Exception as e:
            print(f"Error checking operation status: {e}")
            time.sleep(10)

    print("Generation complete!")
    if operation.response and operation.response.generated_videos:
        generated_video = operation.response.generated_videos[0]
        
        # Save path: We save it to overwrite the existing scroll clip
        output_path = "SaveClip.App_AQOCZicX-ZpkDwoSqV37sVOtiUu3J2l670TxaRzV8USTofQt7vTksoI-PrGP3XZllWWY1uM5BjZvp9YosyCx4Ywsov72eGQYbzzdgI8.mp4"
        print(f"Downloading 4K video to {output_path}...")
        try:
            client.files.download(file=generated_video.video)
            generated_video.video.save(output_path)
            print(f"Success! Hyper-realistic 4K video saved to {output_path}")
        except Exception as e:
            print(f"Error downloading video file: {e}")
    else:
        print("Error: No videos produced or generation failed.")

if __name__ == "__main__":
    generate_video()
