"use client";
import { useEffect } from "react";
import { useState } from "react";
import io from 'socket.io-client';

let socket;

const generateUsername = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `User${randomNumber}`;
};

const username = generateUsername();

function scrollToBottom() {
  const buffer = document.getElementById("messageBox");
        buffer.scrollTop = buffer.scrollHeight;
}

setInterval(scrollToBottom, 500);

export default function Home() {
  const [messages, setMessages] = useState([]);
  let [newMessage, setNewMessage] = useState('');

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
    const buffer = document.getElementById("messageBox");
        buffer.scrollTop = buffer.scrollHeight;
    if(newMessage.trim()) {
      console.log("emitting send message with this message", newMessage.toString());
      let currentDate = new Date();
      socket.emit('sendMessage', username + " at " + currentDate.getHours() +":"+ currentDate.getMinutes() + " said: " + newMessage);
      setNewMessage(''); //Clear any inputs after sending the messages to the socket on the server
    }
  };

  return (
      <div className="">
        <h1 id="mainHeading">welcome to the chat room.</h1>
        <div className="boundingBox">
          <div className="messageParent">
            <div className = "messageBox" id="messageBox">
              {messages.map((msg, index) => (
                <div key={index}>{msg.text}</div>
              ))}
            </div>
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