import os
import cv2
import numpy as np
from rembg import remove

def crop_transparent(img):
    # Find alpha channel
    alpha = img[:, :, 3]
    # Find coordinates of all non-transparent pixels
    coords = cv2.findNonZero(alpha)
    if coords is not None:
        x, y, w, h = cv2.boundingRect(coords)
        # Crop the image with a tiny 10px padding for safety
        pad = 10
        y1 = max(0, y - pad)
        y2 = min(img.shape[0], y + h + pad)
        x1 = max(0, x - pad)
        x2 = min(img.shape[1], x + w + pad)
        return img[y1:y2, x1:x2]
    return img

def process():
    input_path = "fotobalao/20260317_072706.jpg.jpeg"
    output_path = "balloon_no_bg.png"
    
    print(f"Reading input image: {input_path}")
    with open(input_path, 'rb') as i:
        input_data = i.read()
        
    print("Running rembg to remove background...")
    output_data = remove(input_data)
    
    # Convert back to cv2 image to crop transparent edges
    nparr = np.frombuffer(output_data, np.uint8)
    img_rgba = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)
    
    print("Cropping excess transparent borders...")
    cropped_img = crop_transparent(img_rgba)
    
    print(f"Saving final background-removed balloon to {output_path}...")
    cv2.imwrite(output_path, cropped_img)
    print("Background removal complete!")

if __name__ == "__main__":
    process()
