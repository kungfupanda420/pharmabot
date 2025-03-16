import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(res.data.extracted_text);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleAskQuestion = async () => {
    if (!extractedText || !question) {
      alert('Please upload an image and enter a question!');
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:5000/ask', {
        context: extractedText,
        question: question,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div>
      <h1>ML Model Integration with React</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Extract Text</button>

      {extractedText && (
        <div>
          <h2>Extracted Text:</h2>
          <pre>{extractedText}</pre>

          <h2>Ask a Question</h2>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
          />
          <button onClick={handleAskQuestion}>Ask</button>

          {response && (
            <div>
              <h2>Response:</h2>
              <p>{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;