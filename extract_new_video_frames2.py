import os
import cv2

video_path = "/Users/stalotech/Desktop/luisa2/hf_20260903_031748_314254cd-b5eb-4bfc-adde-3a05a9604def.mp4"
output_folder = "frames2"

if not os.path.exists(output_folder):
    os.makedirs(output_folder)
else:
    # Clear existing frames in the folder to avoid confusion
    print(f"Cleaning output folder '{output_folder}'...")
    for f in os.listdir(output_folder):
        if f.endswith(('.png', '.jpg', '.jpeg')):
            try:
                os.remove(os.path.join(output_folder, f))
            except Exception as e:
                print(f"Failed to delete {f}: {e}")

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Total video frames: {total_frames}")

num_target_frames = 300
frame_indices = [int(i * (total_frames - 1) / (num_target_frames - 1)) for i in range(num_target_frames)]

print(f"Extracting {num_target_frames} high-quality JPEG frames...")

for idx, target_idx in enumerate(frame_indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, target_idx)
    ret, frame = cap.read()
    if ret and frame is not None:
        # Save as JPEG with 90% quality for optimal balance of pixel-perfect sharpness and fast web preloading
        out_name = os.path.join(output_folder, f"frame_{idx:03d}.jpg")
        cv2.imwrite(out_name, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
        if idx % 30 == 0 or idx == num_target_frames - 1:
            print(f"  Extracted frame {idx:03d}/299 (video frame {target_idx})")
    else:
        print(f"  Error reading frame at index {target_idx}")

cap.release()
print("All frames successfully extracted!")
