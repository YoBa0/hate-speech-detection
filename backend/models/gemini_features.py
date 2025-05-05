import os
import json
from dotenv import load_dotenv
from google import genai

# Load API key from .env
load_dotenv()
GENAI_API_KEY = os.getenv("GENAI_API_KEY")

# Initialize Gemini client
client = genai.Client(api_key=GENAI_API_KEY)
chat = client.chats.create(model="gemini-2.0-flash")

def use_gemini(text: str) -> dict:
    prompt = (
        "النص التالي يحتوي على كلمات هجومية أو غير محترمة. "
        "استخرج فقط الكلمات الهجومية بدقة، ثم أعد كتابة النص بطريقة محترمة وغير مسيئة.\n"
        f"النص: {text}\n\n"
        "أعد الرد فقط بصيغة JSON وبدون أي شرح أو نص إضافي، يجب أن يكون كالتالي:\n"
        "{\n"
        '  "offensive_keywords": "كلمة1, كلمة2, كلمة3",\n'  # Comma-separated string
        '  "suggested_text": "النص المعدل"\n'
        "}"
    )

    try:
        response = chat.send_message(prompt)
        response_text = response.text.strip()

        # Remove markdown or code block symbols if they exist
        if response_text.startswith("```json"):
            response_text = response_text.replace("```json", "").replace("```", "").strip()
        elif response_text.startswith("```"):
            response_text = response_text.replace("```", "").strip()

        # Parse the JSON response
        parsed = json.loads(response_text)

        # Extract offensive keywords as a comma-separated string
        offensive_keywords_str = parsed.get("offensive_keywords", "")
        suggested_text = parsed.get("suggested_text", "")

        # Split the offensive keywords string into a list and clean it up
        offensive_keywords = [word.strip() for word in offensive_keywords_str.split(",") if word.strip()]

        return {
            "offensive_keywords": offensive_keywords,
            "suggested_text": suggested_text
        }

    except json.JSONDecodeError as e:
        print("❌ Failed to parse Gemini response as JSON")
        return {
            "error": "Invalid JSON response from Gemini",
            "original": text,
            "offensive_keywords": [],
            "suggested_text": ""
        }

    except Exception as e:
        print(f"❌ Error processing Gemini response: {str(e)}")
        return {
            "error": str(e),
            "original": text,
            "offensive_keywords": [],
            "suggested_text": ""
        }

