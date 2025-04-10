import React, { useState } from 'react'
import axios from 'axios'

export const ImportButton = ({props}) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file')
      return;
    }

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    try {
      const response = await axios.post(props.importUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Upload failed. Please try again.')
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};


