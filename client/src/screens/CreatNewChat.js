import React, { useState } from 'react';
import '../utilities/chat.css';
import '../utilities/createNewChat.css';
import { isBrowser } from 'react-device-detect';
import Colors from '../utilities/Colors';

function CreatNewChat({ socket }) {
    const [ option, setOption ] = useState("private");
    return (  
        <div className='account-main-container'>
            <div 
                className='page-container'
                style={{ 
                    width: !isBrowser && "90%",
                    height: !isBrowser && "80%" ,
                    gridTemplateRows: !isBrowser && "10% 12%"
                }}
            >
                <div
                    className='header-option-container'
                >
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center",
                        width:"50%",
                        height:"100%"
                    }} onClick={() => setOption("private")}>
                        <label 
                            style={{
                                fontFamily:"italic",
                                color:"#FFFFFFFF",
                                textShadow: option === "private" && `0px 5px 10px #FFFFFF`,
                                fontSize: option === "private" ? "18px" : "15px",
                                borderBottom: option === "private" && "1px solid #FFFFFF"
                            }}
                        >
                            Private
                        </label>
                    </div>

                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center",
                        width:"50%",
                        height:"100%",
                    }} onClick={() => setOption("group")}>
                        <label 
                            style={{
                                fontFamily:"italic",
                                color:"#FFFFFFFF",
                                textShadow: option === "group" && `0px 5px 10px #FFFFFF`,
                                fontSize: option === "group" ? "18px" : "16px",
                                borderBottom: option === "group" && "1px solid #FFFFFF"
                            }}
                        >
                            Group
                        </label>
                    </div>
                </div>
                <div
                    className='search-line-container'
                >
                    <input
                        style={{
                            width:"80%",
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            backgroundColor:Colors.grey,
                            border:`2px solid ${Colors.blueBold}`,
                            fontFamily:"italic",
                            fontSize:"16px",
                            color:Colors.blueLight,
                            height:"35px"
                        }}
                        placeholder="Search for a contact..."
                    />
                </div>
            </div>
        </div>
    );
}

export default CreatNewChat;