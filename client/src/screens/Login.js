import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
import { BsFileEarmarkPost, BsFillChatFill } from 'react-icons/bs';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { useNavigate, } from 'react-router-dom';
import { socket } from '../socket.io'
import '../utilities/login.css';
import { SetCurrentUserAction } from '../store/actions/index';
import { useDispatch } from 'react-redux';


// components
import BeforLoginHeader from '../components/BeforLoginHeader';
import ForgetPassword from '../components/ForgetPassword';

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showForgetPassword, setShowForgetPassword ] = useState(false);
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [ errorMessage, setErrorMessage ] = useState("");
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
        }, 5000);

        const handelLogin = async(response) => {
            if(!response.status) {
                console.log(response);
                setErrorMessage(response.message);
                setTimeout(() => {
                    setErrorMessage("");
                    setEmail("");
                    setPassword("");
                }, 3000);
            } else {
                let action = SetCurrentUserAction(response.account);
                try{
                    await dispatch(action);
                    navigate('/Home');
                } catch(error) {
                    console.log(error.message);
                }
            }
        }

        const isAuthUser = async(response) => {
            if(response.account) {
                let action = SetCurrentUserAction(response.account);
                try{
                    await dispatch(action);
                    navigate('/Home');
                } catch(error) {
                    console.log(error.message);
                }
            }
        }
        socket.on("login", handelLogin);
        socket.on("auth_user", isAuthUser);

        return () => {
            socket.off("login", handelLogin);
            socket.off("auth_user", isAuthUser);
        }
        
    },[animationIndex, animations.length, navigate, dispatch]);

    
    const login = () => {
        if(email === "" || password === "") {
            setErrorMessage("Email and Password required");
            setTimeout(() => {
                setErrorMessage("");
                setEmail("");
                setPassword("");
            }, 3000)
        } else {
            socket.emit("login", { email: email, password: password });
        }
    }

   
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
                {
                    errorMessage !== "" &&
                    <div 
                        className='error-message'
                        style={{
                            backgroundColor: Colors.blueBold
                        }}
                    >
                        <label style={{
                            fontFamily:"Bold",
                            fontSize:"18px",
                            color:Colors.red,
                            textAlign:"center"
                        }}>
                            {errorMessage}
                        </label>
                    </div>
                }
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
                        type="password"
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
                    }} onClick={login}>
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




