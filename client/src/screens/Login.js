import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
function Login(props) {

    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    

    useEffect(() => {
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handelResize);
        
    },[]);

    return ( 
        <div style={{
            flex:"1",
            display:"flex",
            flexDirection:"column",
            width: windowSize.width,
            height: windowSize.height,
            backgroundColor: Colors.creamyWhite
        }}>
            <div style={{
                backgroundColor:Colors.blackBlue,
                width: windowSize.width,
                height: windowSize.height / 10,
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <label style={{
                    color:"#FFFFFF",
                    fontSize:"30px"
                }}>
                    Posts & Chats
                </label>
            </div>
        </div>
    );
}

export default Login;