import user from '../assets/user.png';
import robot from '../assets/robot.png';
import './ChatMessage.scss';
export function ChatMessage({message, sender}){
   // const {message, sender } = props;
    
        // if(sender === 'robot'){
        //     return(
        //         <div className="chat-message">
        //             <img src={robot} width="30" height="30"/>
        //             <p>{message}</p> 
        //         </div>
        //     )

        // } else {
            return(
                <div className="chat-messages">
                {sender === 'robot' && <img alt="" src={robot} width="30" height="30"/>}
                <p>{message}</p> 
                {sender === 'user' && <img alt="" src={user} width="30" height="30"/>}
                </div>
            )

        //}
}