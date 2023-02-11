import React from 'react';
import Colors from '../utilities/Colors';
import '../utilities/dashboard.css';

function SideBar({ flex, height, menuCollapsed }) {
    const nav = [
        {item: "Profile", func: () => {}},
        {item: "Sign-Out", func: () => {}}
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
                                className='menu-options'
                                key={index}
                                style={{
                                    
                                }}
                            >
                                <label style={{
                                    fontFamily:"Bold",
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