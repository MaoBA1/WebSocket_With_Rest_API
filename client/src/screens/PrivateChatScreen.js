import React, { useEffect, useState } from 'react';
import '../utilities/otherAccount.css';
import '../utilities/chat.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllChats } from '../store/actions';
import { AiOutlineClose } from 'react-icons/ai';
import { MdSend, MdKeyboardArrowDown } from 'react-icons/md';
import Colors from '../utilities/Colors';
import { isBrowser } from 'react-device-detect';



function PrivateChatScreen({ socket }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ chatId, setChatId ] = useState(null);
    const { accountId } = useParams();
    const [ userData, setUserData ] = useState(null);
    const userSelector = useSelector(state => state.Reducer.User);
    const userChats = useSelector(state => state.Reducer.Chats);
    const [ message, setMessage ] = useState("");
    const [ stickToBottom, setStickToBottom ] = useState(true);
    const [ stickToBottomIconVisible, setStickToBottomIconVisible ] = useState(false);
    const [ chat, setChat ] = useState(null);
    const scrollbar = document.getElementById("scroll-bar");
    
    socket?.emit('get_account_by_id', { accountId: accountId });
    
    
    useEffect(() => {
        if(!socket) {
            navigate("/Home")
        }
        
        
        const getUserData = (data) => {
            if(data.status) {
                setUserData(data.account);
            }
        }
    
        const getCurrentChatMessages = (data) => {
            if(data) {
                if(data?.length === 0) return setChat([]);
                const filterdChats = data?.filter(chat => chat.chatType === "private" && chat.participants
                .find(p => p._id === accountId) && chat.participants
                .find(p => p._id === userSelector._id) );
                if(!chatId) {
                    setChatId(filterdChats.length === 0 ? null : filterdChats[0]._id);
                    socket?.emit("mark_all_chat_messages_as_readed", { chatId: filterdChats[0]?._id, currentUserAccountId: userSelector?._id });
                }
                return setChat(filterdChats.length === 0 ? [] : filterdChats[0].messages);
            }
            return setChat([]);
        }
        

        const handelReciveMessage = async(data) => {
            try {
                getCurrentChatMessages(data.accountChats);
                setStickToBottom(true);
                dispatch(setAllChats(data.accountChats));
            } catch(error) {
              console.log(error.message);   
            }    
        }
        const scrollListener = () => {
            setStickToBottomIconVisible(scrollbar?.scrollTop < scrollbar.scrollHeight - scrollbar.clientHeight);
        }
        scrollbar?.addEventListener("scroll", scrollListener);
        
        if(stickToBottom && scrollbar) {
            scrollbar.scrollTop = scrollbar.scrollHeight - scrollbar.clientHeight;
            setStickToBottom(false);
            setStickToBottomIconVisible(false);
        }
        
        if(!userData) {
            socket?.on('get_account_by_id', getUserData);  
        }
        
        if(userChats && userData && !chat) {
            getCurrentChatMessages(userChats);
            setStickToBottom(true);
        }

        if(!userChats) {
            socket?.emit("get_all_chats", { accountId: userSelector?._id });
        }
        
        
        socket?.on("get_all_chats", handelReciveMessage);
        return () => {
            socket?.off("get_all_chats", handelReciveMessage);
            socket?.off('get_account_by_id', getUserData);
        }
    },[
        socket,
        dispatch,
        userSelector,
        navigate,
        accountId,
        scrollbar,
        userChats,
        stickToBottom,
        userData,
        chat,
        chatId
    ]);
    

    const sendMessage = () => {
        if(message.length === 0) return;
        setStickToBottom(true);
        if(!chatId) {
            socket?.emit("send_first_private_message", { accountId1: userSelector._id, accountId2: userData._id, message });
        } else {
            socket?.emit("send_private_message", { chatId, message, accountId1: userSelector._id, accountId2: userData._id });
        }
        return setMessage("");
    }

    const islocalDateStringRequired = (item, index, list) => {
        if(index === 0) return true;
        return new Date(list[index]?.creatAdt).getDay() > new Date(list[index - 1]?.creatAdt).getDay();
    }

    return (  
        <div className='account-main-container'>
            <div 
                className='chat-container'
                style={{ 
                    width: !isBrowser && "90%",
                    height: !isBrowser && "80%" ,
                    gridTemplateRows: !isBrowser && "20% 65% 15%"
                }}
            >
                <div className='chat-header'>
                    <div className='x-icon-container' onClick={() => {navigate("/Home")}}>
                        <AiOutlineClose
                            color='#FFFFFF'
                        />
                    </div>
                    {
                        userData ? 
                        (
                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                alignItems:"center"
                            }}>
                                <img
                                    alt='profile'
                                    src={userData?.profileImage}
                                    style={{ 
                                        width:"65px",
                                        height:"65px",
                                        borderRadius:"50%",
                                        border:"2px solid #FFFFFF"
                                    }}
                                />
                                <label style={{
                                    color:"#FFFFFF",
                                    fontFamily:"Italic"
                                }}>
                                    {userData?.fname + " " + userData?.lname}
                                </label>
                            </div>
                        )
                        :
                        (
                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                alignItems:"center"
                            }}>
                                <div  
                                    className='placeholder'
                                    style={{
                                        width:"65px",
                                        height:"65px",
                                        borderRadius:"50%",
                                    }}
                                />
                                <div 
                                    className='placeholder'
                                    style={{
                                        width:"100px",
                                        height:"20px",
                                        borderRadius:"20px",
                                        marginTop:"5px"
                                    }}
                                />
                            </div>
                        )
                    }
                </div>
                {
                    stickToBottomIconVisible &&
                    <div 
                        onClick={() => {
                            setStickToBottom(true);
                        }}
                        style={{
                            width:"50px",
                            height:"50px",
                            position:"absolute",
                            backgroundColor:"#FFFFFF",
                            bottom: "16%",
                            left:"10px",
                            zIndex:2,
                            border:`2px solid ${Colors.blueLight}`,
                            borderRadius:"50%",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center"
                        }}
                    >
                        <MdKeyboardArrowDown
                            color={Colors.blueLight}
                            size="30px"
                        />
                    </div>
                }
                {
                    !userChats && !scrollbar ?
                    (
                        <div className='messages-container-loading'/>
                    )
                    :
                    (
                        <div className='messages-container'>
                            <div 
                                className='message-scrollbar-container'
                                id='scroll-bar'
                            >
                                
                                {
                                    chat?.map((item, index) => 
                                        <div key={item?._id} className='message-row'>
                                            {
                                                islocalDateStringRequired(item, index, chat) &&
                                                <div style={{
                                                    display:"flex",
                                                    flexDirection:"column",
                                                    alignItems:"center"
                                                }}>
                                                    <div style={{
                                                        backgroundColor: "#7C869B",
                                                        paddingTop:"2px",
                                                        paddingBottom:"2px",
                                                        paddingLeft:"10px",
                                                        paddingRight:"10px",
                                                        margin:"10px",
                                                        borderRadius:"20px",
                                                        opacity:"0.8"
                                                    }}>
                                                        <label style={{
                                                            fontFamily:"italic",
                                                            fontSize:"12px",
                                                            color:"#FFFFFF"
                                                        }}>
                                                            {new Date(item?.creatAdt).toLocaleDateString()}
                                                        </label>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                item?.messageAuthor?._id === userSelector._id ?
                                                (
                                                    <div style={{
                                                        display:"flex",
                                                        flexDirection:"row",
                                                        alignItems:"flex-end",
                                                        alignSelf:"flex-end"
                                                    }}>
                                                        <div style={{
                                                            paddingTop:"5px",
                                                            paddingBottom:"5px",
                                                            paddingRight:"10px",
                                                            paddingLeft:"10px",
                                                            backgroundColor: Colors.blueLight,
                                                            borderTopRightRadius:"20px",
                                                            borderTopLeftRadius:"20px",
                                                            borderBottomLeftRadius:"20px",
                                                            display:"flex",
                                                            flexDirection:"column"
                                                        }}>
                                                            <label style={{
                                                                fontFamily:"italic",
                                                                color:"#FFFFFF",
                                                                fontSize:"15px"
                                                            }}>
                                                                {item?.message}
                                                            </label>
                                                            <label style={{
                                                                fontFamily:"italic",
                                                                color:"#FFFFFF",
                                                                fontSize:"10px",
                                                                alignSelf:"flex-end"
                                                            }}>
                                                                {new Date(item?.creatAdt).toLocaleTimeString().split(":").slice(0,2).join(":")}
                                                            </label>
                                                        </div>
                                                        <img
                                                          src={item?.messageAuthor?.profileImage}
                                                          style={{
                                                            marginLeft:"5px",
                                                            width:"30px",
                                                            height:"30px",
                                                            borderRadius:"50%"
                                                          }}
                                                          alt="profile"
                                                        />
                                                    </div>       
                                                )
                                                :
                                                (
                                                    <div style={{
                                                        display:"flex",
                                                        flexDirection:"row",
                                                        alignItems:"flex-end",
                                                    }}>
                                                        <img
                                                            alt="profile"
                                                            src={item?.messageAuthor?.profileImage}
                                                            style={{
                                                                marginRight:"5px",
                                                                width:"30px",
                                                                height:"30px",
                                                                borderRadius:"50%"
                                                            }}
                                                        />
                                                        <div style={{
                                                            paddingTop:"5px",
                                                            paddingBottom:"5px",
                                                            paddingRight:"10px",
                                                            paddingLeft:"10px",
                                                            backgroundColor: Colors.blueBold,
                                                            borderTopRightRadius:"20px",
                                                            borderTopLeftRadius:"20px",
                                                            borderBottomRightRadius:"20px",
                                                            display:"flex",
                                                            flexDirection:"column"
                                                        }}>
                                                            <label style={{
                                                                fontFamily:"italic",
                                                                color:"#FFFFFF",
                                                                fontSize:"15px"
                                                            }}>
                                                                {item?.message}
                                                            </label>
                                                            <label style={{
                                                                fontFamily:"italic",
                                                                color:"#FFFFFF",
                                                                fontSize:"10px",
                                                            }}>
                                                                {new Date(item?.creatAdt).toLocaleTimeString().split(":").slice(0,2).join(":")}
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                        </div>
                        </div>
                    )
                    
                    
                }
                <div 
                    className='input-container'
                    style={{
                        gridTemplateColumns: !isBrowser && "80% 20%"
                    }}
                >
                    <div style={{ 
                        width:"100%",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"flex-end",
                        justifyContent:"center"
                    }}>
                        <input
                            style={{
                                width:"95%",
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center",
                                backgroundColor:"#FFFFFF",
                                border:`2px solid ${Colors.blueLight}`,
                                fontFamily:"italic",
                                fontSize:"16px",
                                color:Colors.blueLight,
                                height:"35px"
                            }}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={(event) => {
                                if(event.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />
                    </div>

                    <div style={{ 
                        width:"100%",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <div style={{
                            height:"40px",
                            width:"40px",
                            backgroundColor: Colors.grey,
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"center",
                            borderRadius:"50%",
                            border:`2px solid ${Colors.blueLight}`
                        }} onClick={sendMessage}>
                            <MdSend
                                color={Colors.blueLight}
                                size="20px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivateChatScreen;