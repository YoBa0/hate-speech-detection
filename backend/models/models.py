from models import db
from datetime import datetime, timezone

# HateSpeechResult model
class HateSpeechResult(db.Model):
    __tablename__ = 'hate_speech_results'

    id = db.Column(db.Integer, primary_key=True)
    original_text = db.Column(db.Text, nullable=False)
    cleaned_text = db.Column(db.Text, nullable=False)
    label = db.Column(db.String(50), nullable=False)
    label_confidence = db.Column(db.Float, nullable=False)
    severity = db.Column(db.String(50), nullable=True)
    severity_confidence = db.Column(db.Float, nullable=True)
    category = db.Column(db.String(100), nullable=True)
    category_confidence = db.Column(db.Float, nullable=True)
    topic = db.Column(db.String(100), nullable=True)
    topic_confidence = db.Column(db.Float, nullable=True)
    offensive_keywords = db.Column(db.JSON, nullable=True)
    suggested_text = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone.utc))

    # Adding the relationship to Feedback
    feedbacks = db.relationship("Feedback", back_populates="analysis_result")

    def __repr__(self):
        return f'<HateSpeechResult {self.id}, {self.label}, {self.severity}>'

# Define the Feedback model
class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True)
    analysis_id = db.Column(db.Integer, db.ForeignKey('hate_speech_results.id'), nullable=False)  # Foreign key to the analysis result
    feedback_text = db.Column(db.Text, nullable=False)  # The feedback text
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))  # Timestamp for when the feedback was given

    # Relationship to the HateSpeechResult model
    analysis_result = db.relationship("HateSpeechResult", back_populates="feedbacks")

    def __repr__(self):
        return f'<Feedback {self.id}, Analysis ID {self.analysis_id}>'
