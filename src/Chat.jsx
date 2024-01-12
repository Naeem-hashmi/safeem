// Chat.js
import React, { useState, useEffect } from "react";
import GoogleLogin from "./GoogleLogin";
import { database, ref, push, onValue } from "./firebase";
import "./Chat.css";

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const chatRef = ref(database, "chat");
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setChatHistory(Object.values(data));
      }
    });
  }, []);

  const handleUserChange = (newUser) => {
    setUser(newUser);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && user) {
      const newMessage = {
        userId: user.uid,
        userName: user.displayName,
        userPhotoURL: user.photoURL,
        message: message,
        timestamp: new Date().toISOString(),
      };

      const chatRef = ref(database, "chat");
      push(chatRef, newMessage);

      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Safeem</h2>
        <GoogleLogin onUserChange={handleUserChange} />
      </div>
      <div className="chat-content">
        {user && (
          <div className="user-info">
            <img src={user.photoURL} alt="User" className="user-image" />
            <span className="user-name">{user.displayName}</span>
          </div>
        )}
        <div className="chat-history">
          {chatHistory.map((entry, index) => (
            <div
              key={index}
              className={`chat-entry ${
                user && user.uid === entry.userId ? "sender" : "recipient"
              }`}
            >
              {user && user.uid !== entry.userId && (
                <div className="user-info">
                  <img
                    src={entry.userPhotoURL}
                    alt="User"
                    className="user-image"
                  />
                  <span className="user-name">{entry.userName}</span>
                </div>
              )}
              <div className="message-details">
                <p className="message-content">{entry.message}</p>
                <p className="timestamp">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
