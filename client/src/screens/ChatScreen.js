import React, { useEffect, useState } from 'react';
import '../utilities/otherAccount.css';
import '../utilities/chat.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/actions';
import { AiOutlineClose } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';
import Colors from '../utilities/Colors';



function ChatScreen({ socket, setupSocket }) {
    const { width } = window.screen; 
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { accountId } = useParams();
    const [ userData, setUserData ] = useState(null);
    const userSelector = useSelector(state => state.Reducer.User);
    
    
    socket?.emit('get_account_by_id', { accountId: accountId });
    useEffect(() => {
        if(!socket) {
            setupSocket();
        }
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handelResize);

        const getUserData = (data) => {
            if(data.status) {
                setUserData(data.account);
            }
        }

        const get_current_user = async () => {
            try {
                await dispatch(getUser(localStorage.getItem("user_token")));
            } catch(error) {
              console.log(error.message);   
            }
        }
        if(!userSelector) {
            get_current_user();
        }

        socket?.on('get_account_by_id', getUserData);  

        return () => {
            socket?.off('get_account_by_id', getUserData);
        }
    },[socket]);

    return (  
        <div className='account-main-container'>
            <div className='chat-container'>
                <div className='header'>
                    <div className='x-icon-container' onClick={() => {navigate(-1)}}>
                        <AiOutlineClose
                            color='#FFFFFF'
                        />
                    </div>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                    }}>
                        <img
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
                </div>
                <div className='messages-container'>

                </div>
                <div 
                    className='input-container'
                    style={{
                        gridTemplateColumns: `${width * 0.7}px ${width * 0.3}px`
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
                                height:"25px",
                                padding:"10px",
                                backgroundColor:"#FFFFFF",
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
                        <button style={{
                            height:"40px",
                            width:"40px",
                            backgroundColor: Colors.grey,
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"center"
                        }}>
                            <MdSend
                                color={Colors.blueLight}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatScreen;