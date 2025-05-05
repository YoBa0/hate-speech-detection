import torch
import re
import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from models.gemini_features import use_gemini
from models.text_cleaner import combined_preprocessing

# Mappings
label_map = {
    0: "Hate Speech",
    1: "Not Hate Speech"
}

category_map = {
    0: "Ethnic/National Hate",
    1: "Religious Hate",
    2: "Political Hate",
    3: "Gender-Based Hate",
    4: "General Insult"
}

severity_map = {
    0: "Low",
    1: "Medium",
    2: "High"
}

topic_map = {
    0: "Politics",
    1: "Religion",
    2: "Ethnicity",
    3: "Media & Journalism",
    4: "Economy",
    5: "Education",
    6: "Healthcare",
    7: "Sports",
    8: "General",
    9: "Business"
}

# Load model function
def load_model(model_path):
    hf_token = os.getenv("HF_TOKEN")  # Make sure this is set in your environment or .env file

    tokenizer = AutoTokenizer.from_pretrained(
        model_path,
        token=hf_token
    )
    model = AutoModelForSequenceClassification.from_pretrained(
        model_path,
        token=hf_token,
    )
    return tokenizer, model

# Prediction function
def predict(model_bundle, text):
    tokenizer, model = model_bundle
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=1)
        confidence, prediction = torch.max(probs, dim=1)
    return prediction.item(), round(confidence.item(), 4)

# Arabic text check function
def is_arabic_text(text: str) -> bool:
    arabic_regex = re.compile(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]')
    return bool(arabic_regex.search(text))

# Hate speech analysis function
def analyze_hate_speech(models, text):
    # Preprocess the text using combined_preprocessing from text_cleaner
    preprocessed_text = combined_preprocessing(text)

    label_pred, label_conf = predict(models["label"], preprocessed_text)
    topic_pred, topic_conf = predict(models["topic"], preprocessed_text)
    
    category_pred = category_conf = None
    severity_pred = severity_conf = None
    offensive_keywords = []
    suggested_text = ""

    result = {
        "original_text": text,
        "cleaned_text": preprocessed_text,
        "label": label_map[label_pred],
        "label_confidence": label_conf,
        "topic": topic_map.get(topic_pred, "Unknown"),
        "topic_confidence": topic_conf
    }

    if label_pred == 0:  # Hate Speech detected
        category_pred, category_conf = predict(models["category"], preprocessed_text)
        severity_pred, severity_conf = predict(models["severity"], preprocessed_text)
        result.update({
            "category": category_map.get(category_pred, "Unknown"),
            "category_confidence": category_conf,
            "severity": severity_map.get(severity_pred, "Unknown"),
            "severity_confidence": severity_conf,
        })

        gemini_output = use_gemini(preprocessed_text)
        offensive_keywords = gemini_output.get("offensive_keywords", [])
        suggested_text = gemini_output.get("suggested_text", "")

        result.update({
            "offensive_keywords": offensive_keywords,
            "suggested_text": suggested_text
        })

    return result
