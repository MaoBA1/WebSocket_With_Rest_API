import React from 'react';
import Colors from '../utilities/Colors';
import '../utilities/dashboard.css';
import { useNavigate } from 'react-router-dom';
// import { isBrowser } from 'react-device-detect';
import { BsFileEarmarkPost, BsFillChatFill } from 'react-icons/bs';
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineDynamicFeed } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';



function SideBar({ flex, height, menuCollapsed, switchTab, currentTab, setMenuCollapsed }) {
    const navigate = useNavigate();
    const nav = [
        {item: "Feed", func: () => switchTab("Feed"), icon: <MdOutlineDynamicFeed/>},
        {item: "Profile-Setting", func: () => switchTab("Profile-Setting"), icon: <AiFillSetting/>},
        {item: "My-Posts", func: () => switchTab("My-Posts"), icon: <BsFileEarmarkPost/>},
        {item: "Friends", func: () => switchTab("Friends"), icon: <FaUserFriends/>},
        {item: "Chats", func: () => { switchTab("Chats"); navigate('/') }, icon: <BsFillChatFill/>},
        {item: "Sign-Out", func: () => localStorage.removeItem("user_token"), icon: <AiOutlineLogout/>}
    ]
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
                            </button>
                        )
                    }
                </>
            }
        </div>
    );
}

export default SideBar;