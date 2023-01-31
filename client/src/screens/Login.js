import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
import { BsFileEarmarkPost, BsFillChatFill } from 'react-icons/bs';

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
                    alignItems:"center",
                    height:windowSize.height / 4,
                    justifyContent:"space-between"
                }}>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                    }}>
                        <label style={{
                            fontFamily:"Regular",
                            fontWeight:"bold",
                            color: Colors.blueMedium,
                            fontSize:"25px",
                            fontStyle:"italic"
                        }}>
                            User Name
                        </label>
                        <input
                            type={"text"} 
                            style={{
                                width: windowSize.width / 3,
                                borderRadius:"20px",
                                border:`2px solid ${Colors.blueMedium}`,
                                fontFamily:"Regular",
                                padding:"5px",
                                color:Colors.blueLight,
                                fontStyle:"italic"
                            }}
                            placeholder="Type Your User Name..."
                        />
                    </div>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                    }}>
                    <label style={{
                        fontFamily:"Regular",
                        fontWeight:"bold",
                        color: Colors.blueMedium,
                        fontSize:"25px",
                        fontStyle:"italic"
                    }}>
                        Password
                    </label>
                    <input
                        type={"text"} 
                        style={{
                            width: windowSize.width / 3,
                            borderRadius:"20px",
                            border:`2px solid ${Colors.blueMedium}`,
                            fontFamily:"Regular",
                            padding:"5px",
                            color:Colors.blueLight,
                            fontStyle:"italic"
                        }}
                        placeholder="Type Your Password..."
                    />
                    </div>
                </form>
                <div style={{
                    marginTop:"100px",
                    width:windowSize.width / 1.5,
                    padding:"10px",
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}>
                    <BsFileEarmarkPost
                        color={Colors.blueMedium}
                        size={"150px"}
                    />

                    <BsFillChatFill
                        color={Colors.blueBold}
                        size={"150px"}
                    />
                </div>
           </div>
        </div>
    );
}

export default Login;