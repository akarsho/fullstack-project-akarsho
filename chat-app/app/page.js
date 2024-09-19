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
    
    socket.on('loadMessages', (msgs) => {
      setMessages(msgs);
    });
    socket.on('sendMessage', (msg) => {
      setMessages((prevMessages)=>[...prevMessages, msg]);
    });
    return () => {
      socket.disconnect();
    };
  });

  // Handle having a new message
  const sendMessage = () => {
    if(newMessage) {
      socket.emit('sendMessage', newMessage);
      setNewMessage(''); //Clear any inputs after sending the messages to the socket on the server
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        placeholder="Type a message here to send!" 
      />
      <button onClick={sendMessage}>Send!</button>
    </div>
  );
}