import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { isBrowser } from 'react-device-detect';
import { useSelector } from 'react-redux';
import '../utilities/chat.css';

function Chats({ account }) {
    const userSelector = useSelector(state => state.Reducer.User);
    const userChats = useSelector(state => state.Reducer.Chats);
    console.log(userChats);

    const getChatDetails = (chat) => {
        if(chat.chatType === "private") {
            let header = chat?.participants?.filter(p => p._id !== useSelector._id)[0];
            header = header?.fname + " " + header?.lname;
            let image = header?.profileImage;
            let creatAdt = chat?.messages[chat?.messages?.length - 1]?.creatAdt; 
            let lastMessage = {
                message: chat?.messages[chat?.messages?.length - 1]?.message,
                creatAdt: 
                new Date(creatAdt).getDay() === new Date().getDay() ?
                new Date(creatAdt).toLocaleTimeString().split(":").slice(0,2).join(":")
                :
                new Date(creatAdt).toLocaleDateString()
            }
            let sender = chat?.messages?.messageAuthor?._id === userSelector?._id ? "You" : chat?.messages?.messageAuthor?.fname;
            return {
                header,
                image,
                lastMessage,
                sender
            }
        } return null;

    }
    return ( 
        <div className='chat-tab-container'>
            <div 
                className='chat-tab-chats-container'
                style={{
                    width: isBrowser ? "1000px" : "300px",
                    height: isBrowser ? "600px" : "80%"
                }}
            >
                <Scrollbars>
                    
                        {
                            userChats?.map((item, index) => 
                                <div className='chat-tab-chat-row'>
                                    
                                </div>
                            )
                        }       
                    
                </Scrollbars>
            </div>
        </div>
    );
}

export default Chats;