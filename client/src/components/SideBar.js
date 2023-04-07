import React from 'react';
import Colors from '../utilities/Colors';
import '../utilities/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { BsFileEarmarkPost, BsFillChatFill } from 'react-icons/bs';
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineDynamicFeed } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { cleanAllReducerStates } from '../store/actions/index';




function SideBar({ flex, height, menuCollapsed, switchTab, currentTab, setMenuCollapsed, socket, friendNotifications, chatNotifications }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nav = [
        {item: "Feed", func: () => switchTab("Feed"), icon: <MdOutlineDynamicFeed/>},
        {item: "Profile-Setting", func: () => switchTab("Profile-Setting"), icon: <AiFillSetting/>},
        {item: "My-Posts", func: () => switchTab("My-Posts"), icon: <BsFileEarmarkPost/>},
        {item: "Friends", func: () => switchTab("Friends"), icon: <FaUserFriends/>, friendNotifications},
        {item: "Chats", func: () => switchTab("Chats"), icon: <BsFillChatFill/>, chatNotifications},
        {
            item: "Sign-Out", 
            func: () => { 
                try {
                    localStorage.removeItem("user_token"); 
                    dispatch(cleanAllReducerStates());
                    navigate("/");
                    socket.disconnect() 
                } catch(error) {
                    console.log(error.message);
                }
            },
            icon: <AiOutlineLogout/>
        }
    ]
    console.log(chatNotifications);
    return ( 
        <div className='side-bar-nav' style={{
            flex: flex,
            height: height,
            backgroundColor: Colors.blackBlue
        }}>
            { !menuCollapsed &&
                <>
                    {
                        nav.map((item, index) => 
                            <button 
                                onClick={() => {
                                    item.func();
                                    setMenuCollapsed(true);
                                }}
                                className='menu-options'
                                key={index}
                            >
                                {item.icon}
                                <label style={{
                                    fontFamily:"italic",
                                    fontSize:"14px",
                                    color:Colors.blueLight,
                                    marginLeft:"5px"
                                }}>
                                    {item.item}
                                </label>

                                {
                                    item.item === "Chats" && chatNotifications > 0 &&
                                    <div style={{
                                        width:"20px",
                                        height:"20px",
                                        backgroundColor:"red",
                                        borderRadius:"50%",
                                        position:"absolute",
                                        right:10,
                                        border:"1px solid #FFFFFFFF",
                                        display:"flex",
                                        flexDirection:"column",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}>
                                        <label style={{
                                            fontFamily:"italic",
                                            fontSize:"14px",
                                            color:"#FFFFFF"
                                        }}>
                                            {chatNotifications}
                                        </label>
                                    </div>
                                }

                                {
                                    item.item === "Friends" && friendNotifications > 0 &&
                                    <div style={{
                                        width:"20px",
                                        height:"20px",
                                        backgroundColor:"red",
                                        borderRadius:"50%",
                                        position:"absolute",
                                        right:10,
                                        border:"1px solid #FFFFFFFF",
                                        display:"flex",
                                        flexDirection:"column",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}>
                                        <label style={{
                                            fontFamily:"italic",
                                            fontSize:"14px",
                                            color:"#FFFFFF"
                                        }}>
                                            {friendNotifications}
                                        </label>
                                    </div>
                                }
                            </button>
                        )
                    }
                </>
            }
        </div>
    );
}

export default SideBar;