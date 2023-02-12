import React from 'react';
import Colors from '../utilities/Colors';
import '../utilities/dashboard.css';
import { useNavigate } from 'react-router-dom';

function SideBar({ flex, height, menuCollapsed, switchTab, currentTab, setMenuCollapsed }) {
    const navigate = useNavigate();
    const nav = [
        {item: "Feed", func: () => switchTab("Feed")},
        {item: "Profile-Setting", func: () => switchTab("Profile-Setting")},
        {item: "Friends", func: () => switchTab("Friends")},
        {item: "Chats", func: () => switchTab("Chats")},
        {item: "Sign-Out", func: () => switchTab("Feed")}
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
                                style={{
                                    
                                }}
                            >
                                <label style={{
                                    fontFamily:"italic",
                                    fontSize:"16px",
                                    color:Colors.blueLight
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