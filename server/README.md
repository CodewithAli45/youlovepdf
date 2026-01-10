# PDF Operations API

A modern FastAPI-based server for PDF manipulation, starting with PDF merging capabilities.

## 📂 Project Structure

The project follows a modular and scalable structure:

```text
server/
├── app/                      # Main application package
│   ├── main.py               # App entry point, CORS config, and router inclusion
│   ├── api/                  # API layer
│   │   └── v1/               # Version 1 of the API
│   │       ├── api.py        # Router aggregator (includes all feature endpoints)
│   │       └── endpoints/    # Individual API routes (e.g., pdf.py)
│   ├── core/                 # Core configuration and settings
│   │   └── config.py         # Global settings using Pydantic
│   ├── schemas/              # Pydantic models for request/response validation
│   └── services/             # Business logic layer (PDF processing logic)
│       └── pdf_service.py    # Logic for PDF merging using pypdf
├── requirements.txt         # Project dependencies
└── venv/                    # Local virtual environment
```

### 🗝️ Key Components

- **`app/main.py`**: Initializes the FastAPI app and ties everything together.
- **`app/services/pdf_service.py`**: Encapsulates all PDF logic, making it easy to test and reuse.
- **`app/api/v1/endpoints/pdf.py`**: Handles HTTP requests/responses and validates inputs.
- **`app/core/config.py`**: Centralized configuration management.

---

## 🚀 How to Use

### 1. Setup and Run

**Backend (FastAPI)**

```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 6000 --reload
```

**Frontend (React)**

```bash
cd client
npm install
npm run dev -- --host 0.0.0.0 --port 5000
```

### 2. Available Endpoints (Backend)

- `GET /`: Status check
- `POST /api/v1/pdf/merge`: Combine multiple PDFs

### 3. Web Interface (Frontend)

Access the dashboard from any device on your network:

- **Local**: `http://localhost:5000/`
- **Mobile/Network**: `http://10.23.81.185:5000/` (using your local IP)

---

## 🛠️ Adding New Features

To add a new operation:

1.  Add logic to `app/services/`.
2.  Create endpoint in `app/api/v1/endpoints/`.
3.  Include in `app/api/v1/api.py`.
