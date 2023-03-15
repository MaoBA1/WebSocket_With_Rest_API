import React, { useEffect, useState } from 'react';
import '../utilities/otherAccount.css';
import '../utilities/chat.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ChatScreen({ socket, setupSocket }) {
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const { id1, id2 } = useParams();
    const [ userData, setUserData ] = useState(null);
    const userSelector = useSelector(state => state.Reducer.User);
    

    useEffect(() => {
        if(!socket) {
            setupSocket();
            console.log(socket, userData);
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

        socket?.on('get_account_by_id', getUserData);  

        return () => {
            socket?.off('get_account_by_id', getUserData);
        }
    },[socket]);

    return (  
        <div className='account-main-container'>
            <div className='chat-container'>
                <div className='header'>
                    <div>
                        <img
                            src={userData?.profileImage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatScreen;