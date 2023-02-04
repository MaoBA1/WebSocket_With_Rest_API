import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
import { BsFileEarmarkPost, BsFillChatFill } from 'react-icons/bs';
// import { useNavigate, } from 'react-router-dom';
import '../utilities/login.css'


// components
import BeforLoginHeader from '../components/BeforLoginHeader';


function Login(props) {
    // const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
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
        <div className='main-div' style={{
            backgroundColor: Colors.creamyWhite,
            height: windowSize.height
        }}>
            <BeforLoginHeader
                title={"Posts & Chats"}
                subtitle={"Come talk with us"}
            />
            
            <div className='form-container'>
                <div className='icon-container'>
                    <BsFileEarmarkPost
                        color={Colors.blueMedium}
                        size={"80px"}
                    />

                    <BsFillChatFill
                        color={Colors.blueBold}
                        size={"80px"}
                    />  
                </div>
                <form>
                    <label 
                        className='input-labels'
                        style={{ 
                            fontFamily:"Bold",
                            color:Colors.blueMedium 
                        }}
                    >
                        Email
                    </label>
                    <input
                        style={{
                            fontFamily:"Regular",
                            color: Colors.blueMedium
                        }}
                        placeholder="Type Your Email Address..."
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <label 
                        className='input-labels'
                        style={{ 
                            fontFamily:"Bold",
                            color:Colors.blueMedium 
                        }}
                    >
                        Password
                    </label>
                    <input
                        style={{
                            fontFamily:"Regular",
                            color: Colors.blueMedium
                        }}
                        placeholder="Type Your Password..."
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </form>
                <div className='button-container'>
                    <button style={{
                        fontFamily:"Bold",
                        backgroundColor: Colors.blackBlue,
                        border:`2px solid ${Colors.blueMedium}`
                    }}>
                        Login
                    </button>
                    <a 
                        href='/Register'
                        style={{
                            fontFamily:"Regular",
                            color: Colors.blueMedium
                        }}
                    >
                        Sign-Up
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;




