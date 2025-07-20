
import React, { useState } from 'react';
import axios from 'axios';
import '../css/gemini.css';
import { useNavigate } from 'react-router-dom';

function GeminiUpload({ onScanComplete }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate(); // For routing

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const isPDF = file.type === "application/pdf";

    try {
      setUploading(true);
      if (!isPDF) {
        setPreview(URL.createObjectURL(file));
      }

      const response = await axios.post('http://localhost:5000/api/upload-gemini', formData);

      if (response.data.amount && response.data.date) {
        console.log("Gemini Scan Result:", response.data);
        onScanComplete(response.data);
      } else {
        alert("No valid transaction data extracted.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="top-actions">
  <label className="top-btn">
    🧾 AI Scan Receipt
    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
  </label>

  <label className="top-btn">
    📄 AI Scan PDF
    <input type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handlePdfChange} />
  </label>

  {uploading && <p style={{ marginTop: "8px", fontSize: "14px", color: "#ccc" }}>Processing with Gemini AI...</p>}
</div>

  );
}

export default GeminiUpload;