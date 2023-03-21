import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { isBrowser } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../utilities/chat.css';
import Colors from '../utilities/Colors';

function Chats({ account }) {
    const navigate = useNavigate();
    const userSelector = useSelector(state => state.Reducer.User);
    const userChats = useSelector(state => state.Reducer.Chats);
    

    const getChatDetails = (chat) => {
        if(chat?.chatType === "private") {
            let header = chat?.participants?.filter(p => p._id !== userSelector._id)[0];
            let participantId = header._id;
            let image = header?.profileImage;
            header = header?.fname + " " + header?.lname;
            let creatAdt = chat?.messages[chat?.messages?.length - 1]?.creatAdt; 
            let lastMessage = {
                message: chat?.messages[chat?.messages?.length - 1]?.message,
                creatAdt: 
                new Date(creatAdt).getDay() === new Date().getDay() ?
                new Date(creatAdt).toLocaleTimeString().split(":").slice(0,2).join(":")
                :
                new Date(creatAdt).toLocaleDateString()
            }
            let sender = chat?.messages[chat?.messages?.length - 1]?.messageAuthor?._id === userSelector?._id ? "You" : chat?.messages[chat?.messages?.length - 1]?.messageAuthor?.fname;
            let notReaded = chat?.messages?.filter(chat => chat?.newMessage)?.length;
            return {
                header,
                image,
                lastMessage,
                sender,
                notReaded,
                participantId
            }
        } return null;

    }
    return ( 
        <div className='chat-tab-container'>
            <div 
                className='chat-tab-chats-container'
                style={{
                    width: isBrowser ? "1000px" : "300px"
                }}
            >
                <Scrollbars>
                    
                        {
                            userChats?.map((item, index) => {
                                const chat = getChatDetails(item);
                                return (
                                    <div 
                                        key={item._id}
                                        className='chat-tab-chat-row'
                                        style={{
                                            borderTop: index === 0 ? "2px solid grey" : "0.5px solid grey",
                                            borderBottom: index === userChats?.length - 1 ? "2px solid grey" : "0.5px solid grey"
                                        }}
                                        onClick={() => navigate(`/Home/chatScreen/${chat?.participantId}`)}
                                    >
                                        <div style={{
                                            display:"flex",
                                            flexDirection:"row",
                                            alignItems:"center"
                                        }}>
                                            <img
                                                alt='header'
                                                src={chat?.image}
                                                style={{
                                                    width:"40px",
                                                    height:"40px",
                                                    borderRadius:"50%",
                                                    border:"1px solid grey"
                                                }}
                                            />

                                            <div style={{
                                                display:"flex",
                                                flexDirection:"column",
                                                marginLeft:"10px"
                                            }}>
                                                <label style={{
                                                    fontFamily:"italic",
                                                    color: Colors.blueLight
                                                }}>
                                                    {chat?.header}
                                                </label>
                                                <label style={{
                                                    fontFamily:"italic",
                                                    color: "gray",
                                                    opacity:0.7,
                                                    fontSize:"14px"
                                                }}>
                                                    <span style={{ color:Colors.blackBlue }}>
                                                        {chat?.sender + ": "} 
                                                    </span>
                                                    {isBrowser ? chat?.lastMessage?.message : chat?.lastMessage?.message?.length > 15 ? chat?.lastMessage?.message.slice(0,15) + "...." : chat?.lastMessage?.message}
                                                </label>
                                            </div>
                                        </div>
                                        <div style={{
                                            display:"flex",
                                            flexDirection:"column",
                                            alignItems:"flex-end",
                                            justifyContent:"space-around"
                                        }}>
                                            <label style={{
                                                fontFamily:"italic",
                                                color: "gray",
                                                fontSize:"12px"
                                            }}>
                                                {chat?.lastMessage?.creatAdt}
                                            </label>

                                            <div style={{
                                                backgroundColor:Colors.blueLight,
                                                width:"20px",
                                                height:"20px",
                                                borderRadius:"50%",
                                                display:"flex",
                                                flexDirection:"column",
                                                alignItems:"center",
                                                justifyContent:"center"
                                            }}>
                                                <label style={{
                                                    fontFamily:"italic",
                                                    color:"#FFFFFF",
                                                    fontSize:"12px"
                                                }}>
                                                    {chat?.notReaded}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }       
                    
                </Scrollbars>
            </div>
        </div>
    );
}

export default Chats;