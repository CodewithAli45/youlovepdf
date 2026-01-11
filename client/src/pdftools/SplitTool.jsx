import React, { useState } from 'react';
import API_BASE_URL from '../config';

import '../styles/PDFTools.css';

const SplitTool = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSplit = async () => {
    if (!file) {
      setError("Please select a PDF file to split.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const serverUrl = `${API_BASE_URL}/pdf/split`;
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to split PDF. Please check the server.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'split-pdforbit.zip';
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
      <h3>Split PDF</h3>
      <p style={{ marginBottom: '1.5rem' }}>Extract each page of your PDF into separate documents.</p>

      {error && <div className="error-message">{error}</div>}

      {!file ? (
        <div className="upload-area split" onClick={() => document.getElementById('file-upload-split').click()}>
          <input 
            id="file-upload-split" 
            type="file" 
            accept="application/pdf" 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
          />
          <svg style={{ width: '48px', height: '48px', color: 'var(--nav-split)', marginBottom: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
          </svg>
          <p>Click to browse or drag and drop a PDF here</p>
        </div>
      ) : (
        <div className="file-display">
          <div className="file-item">
            <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </span>
            <button className="remove-btn" onClick={removeFile}>&times;</button>
          </div>
        </div>
      )}

      <button 
        className="btn-primary" 
        style={{ width: '100%', justifyContent: 'center', background: 'var(--nav-split)' }}
        onClick={handleSplit}
        disabled={loading || !file}
      >
        {loading ? <div className="loader"></div> : "Split PDF"}
      </button>
    </div>
  );
};

export default SplitTool;
