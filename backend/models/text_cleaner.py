import re
import pandas as pd
from unidecode import unidecode
from nltk.tokenize import word_tokenize
from arabert.preprocess import ArabertPreprocessor

# Load stopword list (you must load this externally when using this file)
all_dz_msa_stopwords = pd.read_csv("datasets/stop_words.csv")

# Initialize AraBERT preprocessor
model_name = "aubmindlab/bert-base-arabertv02"
preprocessor = ArabertPreprocessor(model_name)

# Normalize Arabic text
def normalize_arabic(text):
    text = re.sub("[إأآا]", "ا", text)
    text = re.sub("ؤ", "ء", text)
    text = re.sub("ئ", "ء", text)
    text = re.sub("ة", "ه", text)
    text = re.sub("گ", "ك", text)
    return text

# Remove diacritics
arabic_diacritics = re.compile(r"[\u0617-\u061A\u064B-\u0652\u0640]")

def remove_diacritics(text):
    return re.sub(arabic_diacritics, '', text)

# Remove punctuations
def remove_punctuations(text):
    puncts = r"""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~،؛؟«»"""
    return re.sub(f"[{re.escape(puncts)}]", " ", text)

# Normalize digits and remove them
def normalize_and_remove_numbers(text):
    trans = str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789")
    normalized_text = text.translate(trans)
    return re.sub(r'\d+', '', normalized_text)

# Remove Arabizi
def remove_arabizi(text):
    return ' '.join([word for word in text.split() if not re.search(r'[A-Za-z0-9]', word)])

# Remove elongation
def remove_elongation(text):
    return re.sub(r'(.)\1{2,}', r'\1', text)

# Remove stopwords
def remove_stopwords(text):
    tokens = word_tokenize(text)
    return ' '.join([word for word in tokens if word not in all_dz_msa_stopwords])

# Remove short (1-char) words
def remove_short_words(text):
    return ' '.join([word for word in word_tokenize(text) if len(word) > 1])

# Full pipeline
def combined_preprocessing(text):
    text = remove_arabizi(text)
    text = remove_punctuations(text)
    text = remove_diacritics(text)
    text = normalize_arabic(text)
    text = normalize_and_remove_numbers(text)
    text = remove_elongation(text)
    text = remove_stopwords(text)
    text = remove_short_words(text)
    return preprocessor.preprocess(text)
