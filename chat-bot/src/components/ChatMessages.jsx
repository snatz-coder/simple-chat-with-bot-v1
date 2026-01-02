import { ChatMessage } from "./ChatMessage";
import './ChatMessages.scss';
export function ChatMessages({ chatMessages }) {
  return (
    <div className="chat-messages-container">
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
