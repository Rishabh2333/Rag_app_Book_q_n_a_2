 import React, { useState } from "react";

 function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setUploadMessage("");

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadMessage(`✅ ${data.message}`);
    } catch (err) {
      setUploadMessage("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };
  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const formData = new FormData();
      formData.append("question", question);

      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("❌ Error fetching answer");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📘 Book Q&A (Local RAG)
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Upload your book (PDF):</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {uploadMessage && (
          <p className="text-green-600 font-medium mt-3">{uploadMessage}</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl mt-6">
        <h2 className="text-lg font-semibold mb-2">Ask a question:</h2>
        <textarea
          className="w-full border p-2 rounded-md mb-3"
          rows="3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. What is the main theme of Chapter 2?"
        ></textarea>

        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {answer && (
          <div className="mt-4 bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700 mb-1">Answer:</h3>
            <p className="text-gray-800 whitespace-pre-line">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

