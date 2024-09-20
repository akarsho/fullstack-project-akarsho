"use client";
import { useEffect } from "react";
import { useState } from "react";
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  socket = io('http://localhost:3001');

  useEffect(() => {
    socket = io('http://localhost:3001');

    socket.on('loadMessages', (msgs) => {
        setMessages(msgs);
    });
    socket.on('sendMessage', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
        socket.disconnect();
    };
}, []); 

  // Handle having a new message
  const sendMessage = () => {
    if(newMessage.trim()) {
      console.log("emitting send message with this message", newMessage.toString());
      socket.emit('sendMessage', newMessage);
      setNewMessage(''); //Clear any inputs after sending the messages to the socket on the server
    }
  };

  return (
      <div className="boundingBox">
        <h1 id="mainHeading">welcome to the chat room.</h1>
        <div>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>{msg.text}</div>
            ))}
          </div>
          <input id="inputText"
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Type a message here to send!" 
          />
          <button id="sendButton" onClick={sendMessage}>Send!</button>
        </div>
      </div>  
  );
}