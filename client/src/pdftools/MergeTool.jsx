import React, { useState } from 'react';
import '../styles/PDFTools.css';

const MergeTool = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setError(null);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const serverUrl = `http://${window.location.hostname}:8000/api/v1/pdf/merge`;
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to merge PDFs. Please check the server.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged-pdforbit.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card tool-container">
      <h3>Merge PDFs</h3>
      <p style={{ marginBottom: '1.5rem' }}>Combine multiple PDF files into one single document.</p>

      {error && <div className="error-message">{error}</div>}

      <div className="upload-area merge" onClick={() => document.getElementById('file-upload').click()}>
        <input 
          id="file-upload" 
          type="file" 
          multiple 
          accept="application/pdf" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        <svg style={{ width: '48px', height: '48px', color: 'var(--nav-merge)', marginBottom: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <p>Click to browse or drag and drop PDFs here</p>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
              <button className="remove-btn" onClick={() => removeFile(index)}>&times;</button>
            </div>
          ))}
        </div>
      )}

      <button 
        className="btn-primary" 
        style={{ width: '100%', justifyContent: 'center', background: 'var(--nav-merge)' }}
        onClick={handleMerge}
        disabled={loading || files.length < 2}
      >
        {loading ? <div className="loader"></div> : "Merge Files"}
      </button>
    </div>
  );
};

export default MergeTool;
