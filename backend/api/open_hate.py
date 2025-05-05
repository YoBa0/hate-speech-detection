import os
from flask import Blueprint, request, jsonify
from api.utils import load_model, is_arabic_text, analyze_hate_speech  # Import reusable functions

open_hate = Blueprint('open_hate', __name__)

# Load models
models = {
    "label": load_model("youcef-baha/arabert-hate-speech"),
    "category": load_model("youcef-baha/marabert-hate-speech-category"),
    "severity": load_model("youcef-baha/marabert-hate-speech-severity"),
    "topic": load_model("youcef-baha/marabert-hate-speech-topic"),
}

# Main route
@open_hate.route('/detect', methods=['POST'])
def analyze_text_test():
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"error": "Text is required"}), 400

    if not is_arabic_text(text):
        return jsonify({"error": "Only Arabic text is allowed"}), 400

    # Perform analysis (preprocessing is done inside analyze_hate_speech now)
    result = analyze_hate_speech(models, text)

    return jsonify(result)
