import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.scss";
import { useEffect, useRef } from "react";
export function ChatMessages({ chatMessages }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      ref={chatContainerRef}
      className={`chat-messages-container ${
        chatMessages.length === 0 ? "shift" : ""
      }`}
    >
      {chatMessages.map((chat) => {
        return (
          <ChatMessage
            key={chat.id}
            message={chat.message}
            sender={chat.sender}
          />
        );
      })}
    </div>
  );
}
