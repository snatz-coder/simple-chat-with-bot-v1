import "./App.css";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";

import React, { useEffect } from "react";

function App() {
  const [chatMessages, setChatMessages] = React.useState(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="App">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
