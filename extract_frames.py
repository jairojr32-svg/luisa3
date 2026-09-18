import os
import cv2

video_path = "SaveClip.App_AQOCZicX-ZpkDwoSqV37sVOtiUu3J2l670TxaRzV8USTofQt7vTksoI-PrGP3XZllWWY1uM5BjZvp9YosyCx4Ywsov72eGQYbzzdgI8.mp4"
output_folder = "frames"

if not os.path.exists(output_folder):
    os.makedirs(output_folder)
else:
    # Clear existing png frames in the folder to avoid confusion
    for f in os.listdir(output_folder):
        if f.endswith(('.png', '.jpg', '.jpeg')):
            try:
                os.remove(os.path.join(output_folder, f))
            except Exception:
                pass

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Total video frames: {total_frames}")

num_target_frames = 100
frame_indices = [int(i * (total_frames - 1) / (num_target_frames - 1)) for i in range(num_target_frames)]

print(f"Extracting {num_target_frames} high-quality JPEG frames...")

for idx, target_idx in enumerate(frame_indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, target_idx)
    ret, frame = cap.read()
    if ret and frame is not None:
        # Save as JPEG with 90% quality for optimal balance of pixel-perfect sharpness and fast web preloading
        out_name = os.path.join(output_folder, f"frame_{idx:03d}.jpg")
        cv2.imwrite(out_name, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
        if idx % 10 == 0 or idx == num_target_frames - 1:
            print(f"  Extracted frame {idx:03d}/99 (video frame {target_idx})")
    else:
        print(f"  Error reading frame at index {target_idx}")

cap.release()
print("All frames successfully extracted!")
