import "./App.css";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";

import React from "react";

function App() {
  const [chatMessages, setChatMessages] = React.useState([
    {
      message: "hello chatbot",
      sender: "user",
      id: "id1",
    },
    {
      message: "Hello! How can I help you?",
      sender: "robot",
      id: "id2",
    },
  ]);

  return (
    <div className="App">
      <ChatMessages chatMessages={chatMessages}/>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
