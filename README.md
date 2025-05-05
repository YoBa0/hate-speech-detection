# Hate Speech Detection Web App

This project is a full-stack web application that detects hate speech in Arabic text using NLP and AI techniques. It consists of a **Flask backend**, a **React + Vite frontend**, and a **PostgreSQL** database.

---

## 🗂️ Project Structure
```
hate-speech-detection/
│
├── backend/
│   ├── api/
│   │   ├── hate_speech.py
│   │   ├── dashboard.py
│   │   ├── open_hate.py
│   │   └── feedback.py
│   ├── models/
│   ├── .env
│   ├── app.py
│   ├── requirements.txt
│   └── ...  # Other backend files
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── vite.config.ts
│   └── ...  # Other frontend files
│
├── .gitignore
├── README.md
```

## 📦 Backend Setup (Flask)

1. **Navigate to the backend folder:**
   ```bash
   cd backend

   python -m venv venv
   ```
2. **Activate the virtual environment:**

   - Windows:

      ```bash
      venv\Scripts\activate
      ```
   - Linux:

      ```bash
      source venv/bin/activate
      ```
3. **Install dependencies:**
     ```bash
     pip install -r requirements.txt
      ```
4. **Configure the environment variables:**

    Create a `.env` file in the `backend/` folder and add the following fields:
     ```plaintext
     # Database configuration
     DB_USERNAME=your_database_username
     DB_PASSWORD=your_database_password
     DB_HOST=localhost  # Change this if you're using a remote database
     DB_NAME=your_database_name

    # Gemini API Key configuration
    GENAI_API_KEY=AIzaSyBSgdv3O6bIcQmhN1VbCaNgJKKtXu4VhZs

    # Hugging Face models token
    # This is the token that allow u to access our models repos in HuggingFace
    HF_TOKEN=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 
   

    ```
5. **Creating postgres tables:**

   Run the following SQL in your PostgreSQL database to set up the necessary tables:
   ```sql
   -- Creating hate_speech_results table

   CREATE TABLE hate_speech_results (
    id SERIAL PRIMARY KEY,
    original_text TEXT NOT NULL,
    cleaned_text TEXT NOT NULL,
    label VARCHAR(50) NOT NULL,
    label_confidence FLOAT NOT NULL,
    severity VARCHAR(50),
    severity_confidence FLOAT,
    category VARCHAR(100),
    category_confidence FLOAT,
    topic VARCHAR(100),
    topic_confidence FLOAT,
    offensive_keywords JSON,
    suggested_text TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

    -- Creating feedback table

    CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    analysis_id INTEGER NOT NULL,
    feedback_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_analysis
        FOREIGN KEY (analysis_id)
        REFERENCES hate_speech_results(id)
        ON DELETE CASCADE);
   ```



6. **Run the backend server:**

    ```bash
     python app.py
    ```

## 🌐 Frontend Setup (React + Vite)

1. **In another terminal navigate to the frontend folder:**

    ```bash
    cd frontend 
    ```
2. **Install dependencies:**

    ```bash
    npm install
    ```
3. **Run the development server:**

    ```bash
    npm run dev
    ```
 
