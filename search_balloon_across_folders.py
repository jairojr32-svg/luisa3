import os
import time
from google import genai

def scan_all_folders():
    api_key = "AIzaSyCkihQzCRyS1TVXMYnSwWG3BJQroaD8LJU"
    client = genai.Client(api_key=api_key)
    
    # Let's collect balloon image paths across the workspace
    folders = ["fotobalao", "1 - SALAR", "Fotos melhores ", "Experiencia Salar Balloons"]
    candidates = []
    
    for folder in folders:
        if os.path.exists(folder):
            for file in os.listdir(folder):
                if file.lower().endswith(('.jpeg', '.jpg', '.png', '.webp')):
                    # Let's filter to get some candidate filenames
                    # We will sample representative ones or ones that look like balloon photos
                    path = os.path.join(folder, file)
                    # We skip some obvious scenery files like Palacio or text files
                    if "palacio" in file.lower() or "brunch" in file.lower():
                        continue
                    candidates.append(path)
                    
    print(f"Found {len(candidates)} candidate images. Sampling 8 major candidates to find the best flying balloon...")
    # Let's pick 8 strong candidates across folders
    sampled = [
        "fotobalao/20260317_072729.jpg.jpeg",
        "fotobalao/20260317_072937.jpg.jpeg",
        "1 - SALAR/AdobeStock_1843285687.jpeg",
        "Fotos melhores /571490205.jpg",
        "Fotos melhores /331431181.jpg",
        "Fotos melhores /166685875.jpg",
        "Experiencia Salar Balloons/DeWatermark.ai_1739838463005.png",
        "Experiencia Salar Balloons/Nuevo-tamano_0004_WST06333.webp"
    ]
    
    # Filter only those that actually exist
    existing = [s for s in sampled if os.path.exists(s)]
    
    uploaded = []
    for path in existing:
        print(f"Uploading {path} to Gemini...")
        u = client.files.upload(file=path)
        uploaded.append((path, u))
        
    print("Waiting for file processing...")
    time.sleep(6)
    
    prompt = (
        "We are looking for the absolute best image in the entire project to represent our hot air balloon. "
        "The criteria is: "
        "1. The hot air balloon is fully inflated, flying in the sky (separated from the ground), "
        "and its ENTIRE basket/burner assembly (the wicker basket at the bottom where people stand) "
        "is 100% visible, complete, clear, and NOT cut off or hidden. "
        "2. The image is perfect for background removal (rembg) to extract just the balloon + basket with no trailing cuts. "
        "Please analyze these images and tell me which file path is the absolute best candidate. "
        "Conclude with the selected path on a single line starting with 'BEST_BALLOON_PATH: '"
    )
    
    contents = [item[1] for item in uploaded] + [prompt]
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=contents
    )
    
    print("\n=== GEMINI COMPREHENSIVE BALLOON ANALYSIS ===")
    print(response.text)
    print("=============================================")
    
    with open("balloon_master_report.txt", "w", encoding="utf-8") as rep:
        rep.write(response.text)

if __name__ == "__main__":
    scan_all_folders()
