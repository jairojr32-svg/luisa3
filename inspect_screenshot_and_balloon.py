import os
import time
from google import genai

def inspect_both():
    api_key = "AIzaSyCkihQzCRyS1TVXMYnSwWG3BJQroaD8LJU"
    client = genai.Client(api_key=api_key)
    
    screenshot = "screenshot.png"
    balloon = "balloon_no_bg.png"
    
    print("Uploading screenshot and balloon to Gemini...")
    u1 = client.files.upload(file=screenshot)
    u2 = client.files.upload(file=balloon)
    
    print("Waiting for processing...")
    time.sleep(5)
    
    prompt = (
        "We have two uploaded images:\n"
        "1. 'screenshot.png': The screenshot of the user's live website where they say 'the bottom of the balloon is cut off and not appearing where the people stand'.\n"
        "2. 'balloon_no_bg.png': The actual transparent image file currently saved on their disk.\n\n"
        "Compare these two images and analyze:\n"
        "- What is shown in the website screenshot? Is the balloon from 'balloon_no_bg.png' being displayed, and if so, is its bottom basket actually visible in the file but cut off by the CSS on the page, or is the file itself lacking a basket?\n"
        "- Look closely at 'balloon_no_bg.png'. Does 'balloon_no_bg.png' itself have the basket fully intact at the bottom, or was it cropped or cut off during background removal?\n"
        "- Explain exactly what code (CSS, Tailwind, JSX) we need to change to ensure the full balloon is beautifully visible."
    )
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[u1, u2, prompt]
    )
    
    print("\n=== GEMINI DETAILED SCREENSHOT COMPARISON ===")
    print(response.text)
    print("=============================================")
    
    with open("screenshot_comparison_report.txt", "w", encoding="utf-8") as rep:
        rep.write(response.text)

if __name__ == "__main__":
    inspect_both()
