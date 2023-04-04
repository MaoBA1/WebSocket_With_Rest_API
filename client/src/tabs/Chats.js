import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { isBrowser } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../utilities/chat.css';
import Colors from '../utilities/Colors';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { IoIosChatbubbles } from 'react-icons/io';

function Chats({ account }) {
    const navigate = useNavigate();
    const userSelector = useSelector(state => state.Reducer.User);
    const userChats = useSelector(state => state.Reducer.Chats);
    

    const getChatDetails = (chat) => {
        if(chat?.chatType === "private") {
            let header = chat?.participants?.filter(p => p._id !== userSelector._id)[0];
            let participantId = header?._id;
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
            let notReaded = chat?.messages?.filter(chat => chat?.newMessage && chat?.messageAuthor._id !== userSelector._id)?.length;
            
            return {
                header,
                image,
                lastMessage,
                sender,
                notReaded,
                participantId
            }
        } 
        let header = chat?.participants?.length > 3 ?
        chat?.participants?.map(p => p.fname + " " + p.lname).slice(0,3).join(", ") + "...."
        : chat?.participants?.map(p => p.fname + " " + p.lname).slice(0,3).join(", ");
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
        let notReaded = chat?.messages?.filter(chat => chat?.newMessage && chat?.messageAuthor._id !== userSelector._id)?.length;
        return {
            header,
            lastMessage,
            sender,
            notReaded
        }
    }
    return ( 
        <div 
            className='chat-tab-container'
            style={{
                height: isBrowser ? "900px" : "100%" ,
                gridTemplateRows: isBrowser ? 
                "50px 650px" : "10% 80% 10%",
                overflowY:"hidden"
            }}
        >
            <div style={{
                display: "flex",
                flexDirection:"column",
                justifyContent:"center",
                paddingLeft:"10px"
            }}>
                <button style={{
                    backgroundColor: Colors.blueLight,
                    border:"0px"
                }} onClick={() => navigate(`/Home/creatNewChat`)}>
                    <BiMessageRoundedAdd
                        color='#FFFFFFFF'
                        size={"20px"}
                    />
                    <label style={{
                        fontFamily:"italic",
                        fontSize:"15px",
                        marginLeft:"5px"
                    }}>
                        New Chat
                    </label>
                </button>
            </div>
            <div>
                {
                    userChats?.length > 0 ? 
                    (
                        <Scrollbars
                            style={{
                                width: isBrowser && "1000px",
                                margin:"0 auto"
                            }}
                        >
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
                                            onClick={
                                                item?.chatType === "private" ?
                                                () => navigate(`/Home/chatScreen/${chat?.participantId}`)
                                                :
                                                () => navigate(`/Home/GroupChatScreen/${item?._id}`)
                                            }
                                        >
                                            <div style={{
                                                display:"flex",
                                                flexDirection:"row",
                                                alignItems:"center"
                                            }}>
                                                {
                                                    item?.chatType === "private" ?
                                                    (
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
                                                    )
                                                    :
                                                    (
                                                        <div style={{
                                                            width:"40px",
                                                            height:"40px",
                                                            borderRadius:"50%",
                                                            border:"1px solid grey",
                                                            display:"flex",
                                                            flexDirection:"column",
                                                            alignItems:"center",
                                                            justifyContent:"center",
                                                            backgroundColor: Colors.blueBold
                                                        }}>
                                                            <IoIosChatbubbles
                                                                color='#FFFFFF'
                                                                size={"25px"}
                                                            />
                                                        </div>
                                                    )
                                                }

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

                                                {
                                                    chat?.notReaded > 0 &&
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
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }       
                            
                        </Scrollbars>
                    ) 
                    :
                    (
                        <div style={{
                            height:"100%",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center"
                        }}>
                            <label style={{
                                fontFamily:"italic",
                                textAlign:"center",
                                color: Colors.blueLight,
                                fontSize:"20px"
                            }}>
                                You don't have any chats yet, start making connections and talking with new people...
                            </label>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Chats;