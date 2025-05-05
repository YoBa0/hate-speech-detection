from flask import Blueprint, request, jsonify
from datetime import datetime, timezone
from models import db
from models.models import Feedback, HateSpeechResult

feedback_api = Blueprint('feedback_api', __name__)

# Endpoint for submitting feedback on a specific analysis result
@feedback_api.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    
    # Get analysis ID and feedback text from the request
    analysis_id = data.get('analysis_id')
    feedback_text = data.get('feedback_text')

    if not analysis_id or not feedback_text:
        return jsonify({"error": "Both 'analysis_id' and 'feedback_text' are required"}), 400

    # Check if the analysis_id exists in the HateSpeechResult table
    analysis_result = HateSpeechResult.query.get(analysis_id)
    
    if not analysis_result:
        return jsonify({"error": "Analysis result not found"}), 404

    # Create a new Feedback record
    feedback = Feedback(
        analysis_id=analysis_id,
        feedback_text=feedback_text,
        created_at=datetime.now(timezone.utc)
    )

    # Add the feedback to the session and commit
    db.session.add(feedback)
    db.session.commit()

    return jsonify({"message": "Feedback submitted successfully", "feedback_id": feedback.id}), 201

# Endpoint for getting all feedback related to a specific analysis result
@feedback_api.route('/get_feedback_samples', methods=['GET'])
def get_feedback_samples():
    try:
        # Query 5 feedbacks joined with their related HateSpeechResult
        feedback_samples = (
            db.session.query(Feedback, HateSpeechResult)
            .join(HateSpeechResult, Feedback.analysis_id == HateSpeechResult.id)
            .order_by(Feedback.created_at.desc())  # You can change to random if you prefer
            .limit(3)
            .all()
        )

        if not feedback_samples:
            return jsonify({"message": "No feedback samples found"}), 404

        # Prepare the response
        feedback_data = []
        for feedback, analysis in feedback_samples:
            feedback_data.append({
                "feedback_id": feedback.id,
                "feedback_text": feedback.feedback_text,
                "created_at": feedback.created_at.isoformat(),
                "original_text": analysis.original_text,
                "label": analysis.label
            })

        return jsonify({"feedback_samples": feedback_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500