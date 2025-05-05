import os
from dotenv import load_dotenv  # Make sure to import dotenv
from flask import Flask
from models import db
from api.hate_speech import hate_speech_api
from api.dashboard import dashboard_bp
from api.open_hate import open_hate
from api.feedback import feedback_api
from flask_migrate import Migrate
from flask_cors import CORS
import urllib.parse

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Database configuration (use environment variables)
db_username = os.getenv('DB_USERNAME')  
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')

# Encode username and password
encoded_username = urllib.parse.quote_plus(db_username)
encoded_password = urllib.parse.quote_plus(db_password)

# Set up SQLAlchemy database URI
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f'postgresql://{encoded_username}:{encoded_password}@{db_host}/{db_name}'
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

# Register Blueprints
app.register_blueprint(hate_speech_api, url_prefix='/api/hate_speech')
app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
app.register_blueprint(open_hate, url_prefix='/api/open_hate')
app.register_blueprint(feedback_api, url_prefix='/api/feedback')

@app.route('/')
def home():
    return "Flask app is running!"

if __name__ == '__main__':
    print(f"🚀 Flask server starting with local PostgreSQL")
    app.run(debug=True)
