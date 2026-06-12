# PDF Translation & Summary

AI-powered web application for translating and summarizing PDF documents, built with React, FastAPI, and the Gemini API.

## Getting Started

### Backend Setup

Create and activate a Python virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the required dependencies:

```bash
pip install fastapi uvicorn google.generativeai python-dotenv pymupdf python-multipart
```

Create a `.env` file in the backend directory with your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend server:

```bash
uvicorn main:app --reload
```

### Frontend Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory pointing to the backend API:

```env
VITE_API_URL="http://localhost:8000/"
```

Run the development server:

```bash
npm run dev
```



