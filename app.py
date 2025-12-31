from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import chromadb
from sentence_transformers import SentenceTransformer
from pypdf import PdfReader
import requests

app = FastAPI()

# Allow frontend (React) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local dev; restrict later if deploying
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ChromaDB client (stores embeddings)
client = chromadb.Client()
collection = client.get_or_create_collection("book_chunks")

# Load embedding model (for vector search)
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def chunk_text(text, chunk_size=500):
    words = text.split()
    for i in range(0, len(words), chunk_size):
        yield " ".join(words[i:i + chunk_size])

@app.post("/upload")
async def upload_pdf(file: UploadFile):
    # Save uploaded PDF temporarily
    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract & chunk text
    text = extract_text_from_pdf(file_path)
    chunks = list(chunk_text(text))

    # Embed and store chunks in Chroma
    embeddings = embedding_model.encode(chunks).tolist()
    ids = [f"{file.filename}_{i}" for i in range(len(chunks))]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings
    )

    return {"message": f"File '{file.filename}' processed successfully!", "chunks": len(chunks)}

@app.post("/ask")
async def ask_question(question: str = Form(...)):
    # Embed user question
    q_emb = embedding_model.encode([question]).tolist()[0]

    # Search most relevant text chunks
    results = collection.query(
        query_embeddings=[q_emb],
        n_results=3
    )

    if not results["documents"][0]:
        return {"answer": "I couldn’t find anything relevant in the book."}

    context = "\n\n".join(results["documents"][0])

    # Query Ollama with context + question
    payload = {
        "model": "tinyllama:1.1b",
        "prompt": f"Answer the question based on the context below.\n\nContext:\n{context}\n\nQuestion: {question}\n\nAnswer:",
        "stream": False
    }

    response = requests.post("http://127.0.0.1:11434/api/generate", json=payload, stream=False)
    answer = response.text.strip()

    return {"answer": answer, "context": results["documents"][0]}


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}