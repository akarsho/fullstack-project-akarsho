"use client"
import {useState} from 'react';
import {useEffect} from 'react';
import io from 'socket.io-client';

// create the socket connection to the main server
const socket = io('http://localhost:3000');

export default function Home() {
  // useStates for updating the message text and input fields and to get data from them
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(['']);

  useEffect(() => {
    let getChats = async () => {
      let response = await fetch('/api/messages');
      setMessages(await response.json());
    }
    getChats();
    // messageEmit is the emission that socket gives out when a message is sent
    // we should update frontend 
    socket.on('messageEmit', (text) => {
      setMessages((prevMessages) => [...prevMessages, {text: text}]);
    });
    return () => {
      // turn off the message emit socket emission
      socket.off('messageEmit')
    };
  });
  // send message event
  let sendMessage = (event) => {
    event.preventDefault();
    if(input) {
      // emit a messageEmit
      console.log("emit!");
      socket.emit('messageEmit', input);
      setInput("Type a message!");
    }
  };

  // start to return a webpage to test it out

  return (
    <div className='chat-div'>
      <div className='chat-box'>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message!'
        />
        <button type="submit">Send!</button>
      </form>
    </div>
  );
}
