import  './ChatInput.scss';
import React from 'react';
import Chatbot from "./chatbot";

export function ChatInput({chatMessages, setChatMessages}){

    const [inputText, setInputText] = React.useState('');
    function sendMessage(){
       const newChatMessages = [
           ...chatMessages,
           {
            message:inputText,
            sender:'user',
            id:crypto.randomUUID()
           }
        ]
        setChatMessages(newChatMessages);

        setInputText('');
         const response = Chatbot.getResponse(inputText);
           setChatMessages([
           ...newChatMessages,
           {
            message:response,
            sender:'robot',
            id:crypto.randomUUID()
           }
        ]);

         
    };

    function saveInputText(event){
      setInputText(event.target.value);
    }
    return (
        <div className="chatInput">
            <input type="text" value={inputText} placeholder="Send a Message to the ChatBot" onChange={saveInputText}/>
            <button  onClick={sendMessage}>Send</button>
        </div>
    )
}