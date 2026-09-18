import os
import time
from google import genai
from google.genai import types

def generate_workflow():
    api_key = "AIzaSyCkihQzCRyS1TVXMYnSwWG3BJQroaD8LJU"
    client = genai.Client(api_key=api_key)
    
    # STEP 1: IMAGEN 3.0 (Nano-Banana)
    print("STEP 1: Using Nano-Banana (Imagen 3.0) to recreate the perfect balloon design from scratch...")
    
    prompt_image = (
        "A hyper-realistic, 4K photography, extreme wide shot of a hot air balloon floating over the pristine, "
        "mirror-like salt flats of Salar de Uyuni at golden hour sunrise. The balloon envelope must be fully visible, "
        "perfectly centered, and not cropped at all. The balloon design has vertical sine-wave curvy stripes in pastel "
        "pink, off-white, pastel blue, pastel green, and pastel yellow. Near the top, 'PS-UYU' is printed in black. "
        "Near the bottom black skirt, 'Magic happens' is written in elegant cursive. The lighting is photorealistic, "
        "with deep reflections on the wet salt flat."
    )
    
    try:
        res_img = client.models.generate_images(
            model='imagen-3.0-generate-002',
            prompt=prompt_image,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="9:16",
                output_mime_type="image/jpeg"
            )
        )
        for part in res_img.generated_images:
            part.image.save("nano_banana_balloon.jpg")
        print("Nano-Banana image saved as nano_banana_balloon.jpg")
    except Exception as e2:
        print(f"Imagen failed: {e2}")
        return

    # STEP 2: VEO 3.1 Video Animation
    print("STEP 2: Using Veo 3.1 to animate the newly recreated AI balloon image into a 4K cinematic video...")
    
    try:
        ref_image = types.Image.from_file(location="nano_banana_balloon.jpg")
    except Exception as e:
        print(f"Failed to load AI image: {e}")
        return

    prompt_video = (
        "A hyper-realistic, photorealistic, 4K resolution cinematic vertical 9:16 video. "
        "Animate the reference image perfectly. The hot air balloon is rising gracefully into the pristine sky. "
        "The entire, complete balloon envelope and basket must remain fully visible and perfectly centered, "
        "with absolutely no cropping. Smooth cinematic panning, realistic physics, majestic reflections on the wet salt flat."
    )

    try:
        operation = client.models.generate_videos(
            model="veo-3.1-generate-preview",
            prompt=prompt_video,
            image=ref_image,
            config=types.GenerateVideosConfig(
                number_of_videos=1,
                aspect_ratio="9:16", 
                resolution="4k"
            )
        )
        print(f"Video request accepted! Operation: {operation.name}")
    except Exception as e:
        print(f"Error submitting Veo request: {e}")
        return

    print("Waiting for Veo 3.1 4K video generation (may take 2-3 minutes)...")
    start_time = time.time()
    while not operation.done:
        elapsed = time.time() - start_time
        print(f"[{elapsed:.1f}s] Veo 4K generation in progress...")
        time.sleep(15)
        try:
            operation = client.operations.get(operation)
        except Exception:
            time.sleep(5)

    if operation.response and operation.response.generated_videos:
        generated_video = operation.response.generated_videos[0]
        output_path = "SaveClip.App_AQOCZicX-ZpkDwoSqV37sVOtiUu3J2l670TxaRzV8USTofQt7vTksoI-PrGP3XZllWWY1uM5BjZvp9YosyCx4Ywsov72eGQYbzzdgI8.mp4"
        try:
            client.files.download(file=generated_video.video)
            generated_video.video.save(output_path)
            print(f"SUCCESS! AI Pipeline complete. 4K Video saved to {output_path}")
        except Exception as e:
            print(f"Error saving video: {e}")
    else:
        print("Generation failed.")

if __name__ == "__main__":
    generate_workflow()