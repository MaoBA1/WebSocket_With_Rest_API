import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
import { BsFileEarmarkPost, BsFillChatFill } from 'react-icons/bs';
import { useNavigate, } from 'react-router-dom';



const Header = (windowSize) => {
    return(
        <div style={{
            backgroundColor:Colors.blackBlue,
            // width: windowSize.width,
            // height: windowSize.height / 10,
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
    const navigate = useNavigate();
    const [ nickName, setNickName ] = useState("");
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

    const Login = () => {
        if(nickName !== "") {
            navigate('/Home/',{
                state:{ 
                    userNickName: nickName
                }
            });
        }
    }

    return ( 
        <div style={{
            flex:"1",
            display:"flex",
            flexDirection:"column",
            width: windowSize.width,
            height: windowSize.height,
            backgroundColor: Colors.creamyWhite,
        }}>
           <Header windowSize={windowSize}/>
           <div style={{
                width: windowSize.width / 6,
                alignSelf:"center",
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                position:"absolute",
                top:windowSize.height / 4
           }}>
                <BsFileEarmarkPost
                    color={Colors.blueMedium}
                    size={"100px"}
                />

                <BsFillChatFill
                    color={Colors.blueBold}
                    size={"100px"}
                />
           </div>
           
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
                    height:windowSize.height / 5,
                    justifyContent:"space-between"
                }} onSubmit={Login}>
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
                            Nick Name
                        </label>
                        <input
                            type={"text"} 
                            value={nickName}
                            onChange={(event) => setNickName(event.target.value)}
                            style={{
                                width: windowSize.width / 2.5,
                                height: windowSize.height / 15,
                                borderRadius:"20px",
                                border:`2px solid ${Colors.blueMedium}`,
                                fontFamily:"Regular",
                                paddingLeft:"15px",
                                color:Colors.blueLight,
                                fontStyle:"italic"
                            }}
                            placeholder="Please choose a nickname for yourself..."
                        />
                    </div>
                </form>
                <button style={{
                    width: windowSize.width / 5,
                    height: windowSize.height / 18,
                    borderRadius:"20px",
                    backgroundColor: Colors.blueBold,
                    border:`3px solid ${Colors.blueMedium}`,
                    fontFamily:"Bold",
                    color:"#ffffff",
                    fontSize:"20px"
                }} onClick={Login}>
                    Login
                </button>
           </div>
        </div>
    );
}

export default Login;