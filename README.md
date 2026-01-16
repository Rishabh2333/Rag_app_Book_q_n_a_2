  # 📚 Book QA RAG Application

## 🌐 Project Overview

The **Book QA RAG Application** is a local, privacy-focused **Retrieval-Augmented Generation (RAG)** system that allows users to upload PDF books and ask natural language questions about their content.

The application extracts text from uploaded PDF files, converts the content into vector embeddings, and stores them in a vector database. When a user asks a question, the system retrieves the most relevant sections from the book and provides context-aware answers using a **locally hosted Large Language Model (LLM)** powered by Ollama.

The project is designed to run fully **offline**, ensuring data privacy while demonstrating practical applications of vector search, semantic retrieval, and local LLM inference.

---

## 🛠 Technology Stack

### Backend
- Python
- FastAPI
- ChromaDB / FAISS (Vector Database)
- Sentence Transformers
- PyPDF / PyPDF2
- Uvicorn

### Frontend
- React.js (Vite)
- Tailwind CSS
- Fetch API

### AI & ML
- Ollama (Local LLM Runtime)
- Qwen / Phi Models (Quantized for low memory)
- Retrieval-Augmented Generation (RAG)

---

## ⚙️ Setup and Run Instructions

### Prerequisites
- Python (v3.10 or above)
- Node.js (v18 or above)
- npm
- Git
- Ollama (installed locally)

---

### 📥 Clone the Repository

```bash
git clone https://github.com/Rishabh2333/Rag_app_Book_q_n_a_2
cd Rag_app_Book_q_n_a_2
```
###  🔧 Backend Setup

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```
### Run the backend server:
```bash
uvicorn app:app --reload --port 8000
```

### Backend runs at:
```bash
http://localhost:8000
```
### 🎨 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Frontend runs at:
```bash
http://localhost:5173
```
### 🤖 Ollama Setup

Pull a lightweight model suitable for low-memory systems:
ollama pull qwen3:4b
Start Ollama server:
ollama serve


### Ollama runs at:
```bash
http://localhost:11434
```
---
### 📡 API Documentation

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | /upload  | Upload and process a PDF book |
| POST   | /ask     | Ask questions based on uploaded book |

---
### 🗄 Vector Database Design

*   Text is extracted from PDFs and split into chunks
*   Each chunk is converted into embeddings
*   Embeddings are stored in ChromaDB / FAISS
*   Top-k relevant chunks are retrieved during queries
*   Retrieved context is passed to the LLM for answer generation

---

### 📁 Backend Folder Structure
```bash
backend/
│
├── app.py
├── requirements.txt
├── chroma/
│   └── embeddings/
└── .venv/
```

### 📁 Frontend Folder Structure
```bash
frontend/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── index.html
├── package.json
└── vite.config.js
```
### 🔐 Privacy & Security Highlights

Fully local execution (no cloud APIs)
No external data sharing
All PDFs and embeddings stored locally
Local LLM inference using Ollama

---
### ⚙️ RAG Architecture Design

PDF Upload → Text Extraction
Text Chunking → Vector Embeddings
Semantic Search → Context Retrieval
Retrieved Context → Local LLM Answer Generation
This ensures accurate, explainable, and source-grounded answers.

---
### 🤖 AI-Assisted Development

Assisted in designing RAG architecture
Guided selection of lightweight LLMs for low-memory systems
Helped structure FastAPI backend and vector database workflow
Assisted in frontend-backend integration
Helped document and structure this README.md

---
### 📊 AI Effectiveness Score

Score: 4 / 5

### Justification:
AI tools significantly accelerated development by assisting with RAG architecture design, vector database integration, and local LLM setup. However, manual debugging was required for memory constraints and model compatibility issues, slightly reducing overall efficiency.

---
### 👤 Author

Rishabh Mishra
B.Tech Student
VJTI
