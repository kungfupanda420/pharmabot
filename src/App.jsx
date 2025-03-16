import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [chats, setChats] = useState([{ id: 1, history: [] }]);
  const [activeChat, setActiveChat] = useState(1);
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');

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

      updateChatHistory({ type: 'bot', text: 'File uploaded and text extracted successfully!' });
    } catch (error) {
      console.error('Error uploading file:', error);
      updateChatHistory({ type: 'bot', text: 'Error uploading file. Please try again.' });
    }
  };

  const handleAskQuestion = async () => {
    if (!question) {
      alert('Please enter a question!');
      return;
    }

    updateChatHistory({ type: 'user', text: question });

    try {
      const res = await axios.post('http://127.0.0.1:5000/ask', {
        context: 'Extracted text here', // Replace with actual extracted text from API
        question: question,
      });

      updateChatHistory({ type: 'bot', text: res.data.response });
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      updateChatHistory({ type: 'bot', text: 'Error asking question. Please try again.' });
    }
  };

  const updateChatHistory = (message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? { ...chat, history: [...chat.history, message] }
          : chat
      )
    );
  };

  const handleNewChat = () => {
    const newChatId = chats.length + 1;
    setChats([...chats, { id: newChatId, history: [] }]);
    setActiveChat(newChatId);
  };

  return (
    <div className="chatbot-container">
      <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
      <h1>Pharma Bot</h1>

      <div className="tabs">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`tab ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => setActiveChat(chat.id)}
          >
            Chat {chat.id}
          </div>
        ))}
      </div>

      <div className="file-upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="chat-window">
        {chats.find((chat) => chat.id === activeChat)?.history.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.type}`}>
            {chat.text}
          </div>
        ))}
      </div>

      <div className="question-input-section">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleAskQuestion}>Send</button>
      </div>
    </div>
  );
}

export default App;
