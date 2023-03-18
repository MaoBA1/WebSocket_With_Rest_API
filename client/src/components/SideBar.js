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




function SideBar({ flex, height, menuCollapsed, switchTab, currentTab, setMenuCollapsed, socket }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nav = [
        {item: "Feed", func: () => switchTab("Feed"), icon: <MdOutlineDynamicFeed/>},
        {item: "Profile-Setting", func: () => switchTab("Profile-Setting"), icon: <AiFillSetting/>},
        {item: "My-Posts", func: () => switchTab("My-Posts"), icon: <BsFileEarmarkPost/>},
        {item: "Friends", func: () => switchTab("Friends"), icon: <FaUserFriends/>},
        {item: "Chats", func: () => switchTab("Chats"), icon: <BsFillChatFill/>},
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