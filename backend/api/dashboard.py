from flask import Blueprint, jsonify
from sqlalchemy import func
from models.models import db, HateSpeechResult
from collections import Counter
import json

# Initialize blueprint
dashboard_bp = Blueprint('dashboard', __name__)

# Route to get dashboard summary
@dashboard_bp.route('/dashboard-summary', methods=['GET'])
def dashboard_summary():
    try:
        # Total counts
        total_texts = db.session.query(HateSpeechResult).count()
        total_hate_speech = db.session.query(HateSpeechResult).filter(HateSpeechResult.label == 'Hate Speech').count()
        total_safe = total_texts - total_hate_speech

        # Severity distribution
        severity_counts = (
            db.session.query(HateSpeechResult.severity, func.count())
            .filter(HateSpeechResult.severity.isnot(None))
            .group_by(HateSpeechResult.severity)
            .all()
        )
        severity_data = [{"severity": severity, "count": count} for severity, count in severity_counts]

        # Category breakdown
        category_results = HateSpeechResult.query.filter(HateSpeechResult.category.isnot(None)).all()
        category_counter = Counter(result.category for result in category_results)
        category_data = [{"category": k, "count": v} for k, v in category_counter.items()]

        # Common offensive keywords
        all_keywords = db.session.query(HateSpeechResult.offensive_keywords)\
            .filter(HateSpeechResult.offensive_keywords.isnot(None)).all()
        keywords_flattened = []
        for row in all_keywords:
            item = row[0]
            if not item:
                continue
            if isinstance(item, list):
                decoded = [json.loads(f'"{kw}"') if isinstance(kw, str) else kw for kw in item]
                keywords_flattened.extend([kw.strip() for kw in decoded if kw and isinstance(kw, str)])
            elif isinstance(item, str):
                try:
                    parsed = json.loads(item)
                    if isinstance(parsed, list):
                        decoded = [json.loads(f'"{kw}"') if isinstance(kw, str) else kw for kw in parsed]
                        keywords_flattened.extend([kw.strip() for kw in decoded if kw and isinstance(kw, str)])
                    else:
                        keywords_flattened.extend([kw.strip() for kw in item.split(",") if kw.strip()])
                except json.JSONDecodeError:
                    keywords_flattened.extend([kw.strip() for kw in item.split(",") if kw.strip()])
        keyword_counts = Counter(keywords_flattened)
        common_keywords = [{"keyword": kw, "count": count} for kw, count in keyword_counts.most_common(5)]

        # Sample hate speech cases
        latest_cases = (
            db.session.query(HateSpeechResult)
            .filter(HateSpeechResult.label == "Hate Speech")
            .order_by(HateSpeechResult.timestamp.desc())
            .limit(6)
            .all()
        )
        sample_data = [{
            "original_text": case.original_text,
            "cleaned_text": case.cleaned_text,
            "severity": case.severity,
            "category": case.category,
            "topic": case.topic,
            "offensive_keywords": case.offensive_keywords,
            "suggested_text": case.suggested_text,
            "timestamp": case.timestamp.isoformat() if case.timestamp else None
        } for case in latest_cases]

        # Topic trends over time
        topic_entries = db.session.query(
            HateSpeechResult.timestamp,
            HateSpeechResult.topic
        ).filter(
            HateSpeechResult.topic.isnot(None),
            HateSpeechResult.label == 'Hate Speech'  # Filter only hate speech topics
        ).all()
        topic_trends_map = {}
        for timestamp, topic in topic_entries:
            year_month = timestamp.strftime("%Y-%m")
            if year_month not in topic_trends_map:
                topic_trends_map[year_month] = {}
            topic_trends_map[year_month][topic] = topic_trends_map[year_month].get(topic, 0) + 1
        topic_trends = []
        for date, topics in sorted(topic_trends_map.items()):
            for topic, count in topics.items():
                topic_trends.append({
                    "date": date,
                    "topic": topic,
                    "count": count
                })

        # Final combined JSON
        return jsonify({
            "totals": {
                "total_texts": total_texts,
                "total_hate_speech": total_hate_speech,
                "total_safe": total_safe
            },
            "severity_distribution": severity_data,
            "category_breakdown": category_data,
            "common_keywords": common_keywords,
            "sample_cases": sample_data,
            "topic_trends": topic_trends
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
