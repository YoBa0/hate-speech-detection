from flask import Blueprint, request, jsonify
from models import db
from models.models import HateSpeechResult
from api.utils import analyze_hate_speech, load_model, is_arabic_text

# Initialize the Blueprint for the API
hate_speech_api = Blueprint('hate_speech_api', __name__)


# Load models
models = {
    "label": load_model("youcef-baha/arabert-hate-speech"),
    "category": load_model("youcef-baha/marabert-hate-speech-category"),
    "severity": load_model("youcef-baha/marabert-hate-speech-severity"),
    "topic": load_model("youcef-baha/marabert-hate-speech-topic"),
}

# Main API route
@hate_speech_api.route('/detect', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"error": "Text is required"}), 400
    
    if not is_arabic_text(text):
        return jsonify({"error": "Only Arabic text is allowed"}), 400

    # Call the analyze_hate_speech function from utils.py
    result = analyze_hate_speech(models, text)

    # Save to DB
    hs_entry = HateSpeechResult(
        original_text=result["original_text"],
        cleaned_text=result["cleaned_text"],
        label=result["label"],
        label_confidence=result["label_confidence"],
        topic=result.get("topic"),
        topic_confidence=result.get("topic_confidence"),
        category=result.get("category"),
        category_confidence=result.get("category_confidence"),
        severity=result.get("severity"),
        severity_confidence=result.get("severity_confidence"),
        offensive_keywords=result.get("offensive_keywords"),
        suggested_text=result.get("suggested_text")
    )

    db.session.add(hs_entry)
    db.session.commit()

    # Return the ID of the analysis along with results
    result["id"] = hs_entry.id
    return jsonify(result)
