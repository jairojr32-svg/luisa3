import os
from google import genai

def analyze():
    api_key = "AIzaSyCkihQzCRyS1TVXMYnSwWG3BJQroaD8LJU"
    client = genai.Client(api_key=api_key)
    
    screenshot_path = "screenshot.png"
    print(f"Uploading screenshot {screenshot_path} to Gemini for layout analysis...")
    
    u = client.files.upload(file=screenshot_path)
    
    import time
    time.sleep(4)
    
    prompt = (
        "Look closely at this screenshot of the live website's 'THE ODYSSEY' section. "
        "The user says that the bottom of the balloon (the basket/where people stand) is STILL cut off. "
        "Analyze the screenshot carefully:\n"
        "1. Identify exactly what is causing the balloon/basket to be cut off. "
        "Is it a CSS clipping/overflow issue, container height limits, image cropping, or something else?\n"
        "2. Provide clear, precise CSS/HTML/JSX code modifications to completely fix this, "
        "ensuring the entire balloon and basket are fully visible, beautifully floating, and in perfect harmony."
    )
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[u, prompt]
    )
    
    print("\n=== GEMINI SCREENSHOT ANALYSIS ===")
    print(response.text)
    print("==================================")
    
    with open("screenshot_analysis_report.txt", "w", encoding="utf-8") as rep:
        rep.write(response.text)

if __name__ == "__main__":
    analyze()
