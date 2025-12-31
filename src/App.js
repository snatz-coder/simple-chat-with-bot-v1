import "./App.css";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

import React from 'react';


function App() {
  const  [chatMessages, setChatMessages] = React.useState([
    {
      message: "hello chatbot",
      sender: "user",
      id:'id1'
    },
    {
      message: "Hello! How can I help you?",
      sender: "robot",
      id:'id2'
    },
  ])

  return (
    <div className="App">
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
      {chatMessages.map((chat) => {
        return <ChatMessage key={chat.id} message={chat.message} sender={chat.sender} />;
      })}
    </div>
  );
}

export default App;
