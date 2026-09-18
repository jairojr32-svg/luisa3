import os
import time
import cv2
import numpy as np
from google import genai
from google.genai import types

def generate_video():
    api_key = "AIzaSyCkihQzCRyS1TVXMYnSwWG3BJQroaD8LJU"
    client = genai.Client(api_key=api_key)
    
    # 1. Perfectly crop and enhance the best original photo to 9:16
    img_path = "fotobalao/20260317_072706.jpg.jpeg"
    img = cv2.imread(img_path)
    
    # The balloon is roughly in the center
    h, w, _ = img.shape
    
    # We want a 9:16 aspect ratio crop
    # Let's frame it so the balloon is perfectly centered and fully visible
    # Balloon is roughly between x=1000 and x=2300, y=500 and y=2500
    target_w = int(h * (9/16))
    
    if target_w > w:
        target_w = w
        target_h = int(w * (16/9))
        crop_y1 = max(0, (h - target_h) // 2)
        crop_y2 = crop_y1 + target_h
        crop_x1 = 0
        crop_x2 = w
    else:
        crop_y1 = 0
        crop_y2 = h
        crop_x1 = max(0, (w - target_w) // 2)
        crop_x2 = crop_x1 + target_w
        
    crop = img[crop_y1:crop_y2, crop_x1:crop_x2]
    
    # AI-style Upscale & Enhance (simulate Nano-Banana pristine quality)
    crop = cv2.resize(crop, (2160, 3840), interpolation=cv2.INTER_CUBIC)
    
    # Mild sharpening
    kernel = np.array([[0, -1, 0],
                       [-1, 5,-1],
                       [0, -1, 0]])
    enhanced = cv2.filter2D(crop, -1, kernel)
    
    # Blend to not over-sharpen
    final_img = cv2.addWeighted(crop, 0.7, enhanced, 0.3, 0)
    
    ref_image_path = "perfect_reference.jpg"
    cv2.imwrite(ref_image_path, final_img)
    print(f"Perfectly framed 4K reference image saved to {ref_image_path}")

    # 2. Veo 3.1 Animation
    print("Submitting 4K video generation request to Google Veo 3.1...")
    
    try:
        ref_image = types.Image.from_file(location=ref_image_path)
    except Exception as e:
        print(f"Failed to load image for SDK: {e}")
        return

    prompt = (
        "A hyper-realistic, photorealistic, 4K resolution cinematic vertical 9:16 video. "
        "Animate the reference image perfectly. The hot air balloon is rising gracefully into the pristine sky. "
        "The entire, complete balloon envelope and basket must remain fully visible and perfectly centered, "
        "with absolutely no cropping. Smooth cinematic panning, realistic physics, majestic reflections on the wet salt flat."
    )

    try:
        operation = client.models.generate_videos(
            model="veo-3.1-generate-preview",
            prompt=prompt,
            image=ref_image,
            config=types.GenerateVideosConfig(
                number_of_videos=1,
                aspect_ratio="9:16", 
                resolution="4k"
            )
        )
        print(f"Video request accepted! Operation Name: {operation.name}")
    except Exception as e:
        print(f"Error submitting generation request: {e}")
        return

    print("Waiting for 4K video generation (may take 2-4 minutes for 4K quality)...")
    start_time = time.time()
    while not operation.done:
        elapsed = time.time() - start_time
        print(f"[{elapsed:.1f}s] 4K video generation in progress...")
        time.sleep(20)
        try:
            operation = client.operations.get(operation)
        except Exception as e:
            time.sleep(10)

    print("Generation complete!")
    if operation.response and operation.response.generated_videos:
        generated_video = operation.response.generated_videos[0]
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
