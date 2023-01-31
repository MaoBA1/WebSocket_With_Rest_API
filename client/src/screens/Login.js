import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';

const Header = (windowSize) => {
    return(
        <div style={{
            backgroundColor:Colors.blackBlue,
            width: windowSize.width,
            height: windowSize.height / 10,
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <div style={{
                display:"flex",
                flexDirection:"column", 
                alignItems:"center"
            }}>
                <label style={{
                    color:"#FFFFFF",
                    fontSize:"30px",
                    fontFamily:"Bold",
                }}>
                    Posts & Chats
                </label>
                <label style={{
                    color:"#FFFFFF",
                    fontSize:"25px",
                    fontFamily:"Regular",
                    fontStyle:"italic"
                }}>
                    Come talk with us
                </label>
            </div>
        </div>
    )
}



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
           <Header windowSize={windowSize}/>
           <div style={{
                flex:"1",
                display:"flex",
                flexDirection:"column",
                width:windowSize.width,
                height: windowSize.height - (windowSize.height / 10),
                alignItems:"center",
                justifyContent:"center"
           }}>
                <form style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center"
                }}>
                    <label style={{
                        fontFamily:"Regular",
                        fontWeight:"bold",
                        color: Colors.blueLight,
                        fontSize:"25px",
                        fontStyle:"italic"
                    }}>
                        User Name
                    </label>
                    <input
                        type={"text"} 
                        style={{
                            width: windowSize.width / 5
                        }}
                    />
                </form>
           </div>
        </div>
    );
}

export default Login;