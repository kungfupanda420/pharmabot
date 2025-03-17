import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(1); // Default chat ID
  const [chats, setChats] = useState([{ id: 1, name: 'Chat 1' }]); // Initialize with default chat
  const [chatHistories, setChatHistories] = useState({ 1: [] }); // Store chat histories

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !file) {
      alert('Please enter a message or select a file!');
      return;
    }

    const updatedHistories = { ...chatHistories };

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        updatedHistories[activeChat] = [
          ...updatedHistories[activeChat],
          { type: 'user', content: URL.createObjectURL(file), isImage: true },
        ];
        setFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
        updatedHistories[activeChat] = [
          ...updatedHistories[activeChat],
          { type: 'bot', content: 'Error uploading file. Please try again.', isImage: false },
        ];
      }
    }

    if (message.trim()) {
      updatedHistories[activeChat] = [
        ...updatedHistories[activeChat],
        { type: 'user', content: message, isImage: false },
      ];
      setMessage('');

      try {
        const res = await axios.post('http://127.0.0.1:5000/ask', {
          context: message,
          question: message,
        });

        updatedHistories[activeChat] = [
          ...updatedHistories[activeChat],
          { type: 'bot', content: res.data.response, isImage: false },
        ];
      } catch (error) {
        console.error('Error sending message:', error);
        updatedHistories[activeChat] = [
          ...updatedHistories[activeChat],
          { type: 'bot', content: 'Error sending message. Please try again.', isImage: false },
        ];
      }
    }

    setChatHistories(updatedHistories);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    const newChatId = chats.length + 1;
    const newChat = { id: newChatId, name: `Chat ${newChatId}` };
    setChats([...chats, newChat]);
    setChatHistories({ ...chatHistories, [newChatId]: [] });
    setActiveChat(newChatId);
    setFile(null);
    setMessage('');
  };

  const switchChat = (chatId) => {
    setActiveChat(chatId);
    setFile(null);
    setMessage('');
  };

  return (
    <div className="chatbot-container">
      <div className="sidebar">
        <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
        <div className="chat-list">
          {chats.map(chat => (
            <div key={chat.id} className={`chat-item ${activeChat === chat.id ? 'active' : ''}`} onClick={() => switchChat(chat.id)}>
              {chat.name}
            </div>
          ))}
        </div>
      </div>
      <div className="main-chat">
        <h1>Pharma Bot</h1>
        <div className="chat-window">
          {chatHistories[activeChat]?.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.type}`}>
              {chat.isImage ? (
                <img src={chat.content} alt="Uploaded" className="chat-image" />
              ) : (
                <div className="chat-text">{chat.content}</div>
              )}
            </div>
          ))}
        </div>
        <div className="input-section">
          <div className="file-upload-section">
            <label htmlFor="file-upload" className="file-upload-label">
              📎
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className="message-input-section">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Add this line
              placeholder="Type a message..."
              autoFocus
            />
            <button onClick={handleSendMessage}>Ask</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;