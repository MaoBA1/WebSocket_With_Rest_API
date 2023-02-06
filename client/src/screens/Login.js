import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
import { BsFileEarmarkPost, BsFillChatFill } from 'react-icons/bs';
import { MdOutlineVideoLibrary } from 'react-icons/md';
// import { useNavigate, } from 'react-router-dom';
import '../utilities/login.css'


// components
import BeforLoginHeader from '../components/BeforLoginHeader';
import ForgetPassword from '../components/ForgetPassword';

function Login(props) {
    // const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showForgetPassword, setShowForgetPassword ] = useState(false);
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [ animationIndex, setAnimationIndex ] = useState(0);
    const animations = [
        <BsFileEarmarkPost
            className='animation'
            color={Colors.blueMedium}
            size={"120px"}
        />
        ,
        <label style={{
            fontFamily:"Bold",
            fontSize:"35px",
            color:Colors.blueBold,
            textAlign:"center"
        }} className='animation'>
            Share your posts with us
        </label>
        ,
        <MdOutlineVideoLibrary
            className='animation'
            color={Colors.blueLight}
            size={"120px"}
        />,
        <label style={{
            fontFamily:"Bold",
            fontSize:"35px",
            color:Colors.blueBold,
            textAlign:"center"
        }} className='animation'>
            Share videos and photos
        </label>
        ,
        <BsFillChatFill
            className='animation'
            color={Colors.blueBold}
            size={"120px"}
        />,
        <label style={{
            fontFamily:"Bold",
            fontSize:"30px",
            color:Colors.blueBold,
            textAlign:"center"
        }} className='animation'>
            Talk with new people on live group chats
        </label>
    ]

    useEffect(() => {
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handelResize);
        setTimeout(() => {
            setAnimationIndex(animationIndex + 1);
        }, 5000)
    },[animationIndex, animations.length]);

    
    

   
    return ( 
        <div className='main-div' style={{
            backgroundColor: Colors.creamyWhite,
            height: windowSize.height
        }}>
            <BeforLoginHeader
                title={"Posts & Chats"}
                subtitle={"Come talk with us"}
            />
            {showForgetPassword && <ForgetPassword setVisible={() => setShowForgetPassword()}/>}
            <div className='form-container'>
                <div className='icon-container'>
                    {animations[animationIndex % animations.length]}
                </div>
                <form style={{
                    width:"60%",
                    borderRadius:"20px",
                    boxShadow:"#000000 0px 5px 15px"
                }}>
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
                            color: Colors.blueMedium,
                            backgroundColor:Colors.grey
                        }}
                        placeholder="Email Address..."
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
                            color: Colors.blueMedium,
                            backgroundColor:Colors.grey
                        }}
                        placeholder="Password..."
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <label
                        onClick={() => setShowForgetPassword(true)}  
                        className='forget-password' 
                        style={{
                            color:Colors.blueLight,
                            border:"none",
                            background:"none",
                            fontSize:"15px",
                            width:"max-content",
                            fontFamily:"Bold",
                            fontStyle:"italic",
                            borderBottom:`1px solid ${Colors.blueLight}`,
                            borderRadius:"0px",
                            display:"flex",
                            flexDirection:"column",
                            justifyContent:"flex-end"
                        }}
                    >
                        Forget Password ? 
                    </label>
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




