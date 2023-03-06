import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
// import serverBaseUrl from '../serverBaseUrl';
import '../utilities/otherAccount.css';
import { AiOutlineClose, AiFillMessage } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { BiHistory } from 'react-icons/bi';
import Colors from '../utilities/Colors';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import DisplayMediaModal from '../components/DisplayMediaModal';
import PostLikersModal from '../components/postModalComponent/PostLikersModal';
import PostComments from '../components/postModalComponent/PostComments';
import { getUser, setUser } from '../store/actions/index';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import { isBrowser } from 'react-device-detect';


import CostumModal from '../components/CostumModal';


function OtherAccount({ socket }) {
    let lastScrollY = window.pageYOffset;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { accountId } = useParams();
    const [ userData, setUserData ] = useState(null);
    const [ mediaToDisplay, setMediaToDisplay ] = useState(null);
    const [ likersVisible, setLikersVisible ] = useState(false);
    const [ likersArray, setLikersArray ] = useState([]);
    const [ commentVisible, setCommentVisible ] = useState(false);
    const [ post, setPost ] = useState(null);
    const userSelector = useSelector(state => state.Reducer.User);
    const [ labelVisbilty, setLabelVisbilty ] = useState(isBrowser);
    const [ costumeMoadlVisible, setCostumModalVisible ] = useState(false);
    const [ costumeModalMessage, setCostumeModalMessage ] = useState("");
    const [ costumeModalButtons, setCostumeModalButtons ] = useState([]);
    const { width } = window.screen;
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    socket?.emit('get_account_by_id', { accountId: accountId });
    
    useEffect(() => {
        if(!socket) navigate(-1);
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handelResize);
        const scrollbar = document.getElementById("scroll-bar");
        const handelIconsUI = () => {
            if(
                scrollbar.scrollTop > 100 ||
                !isBrowser
            ) {
                setLabelVisbilty(false);
            } else {
                setLabelVisbilty(true);
            }
        }
        scrollbar.addEventListener("scroll", handelIconsUI)
        
        
        const get_current_user = async () => {
            try {
                await dispatch(getUser(localStorage.getItem("user_token")));
            } catch(error) {
              console.log(error.message);   
            }
        }
        if(!userSelector) {
            get_current_user();
        }
        

        const getUserData = (data) => {
            if(data.status) {
                setUserData(data.account);
            }
        }

        const handelUserChanges = (data) => {
            try {
                dispatch(setUser(data.account));
            } catch(error) {
                console.log(error.message);
            }
        }
        
        socket?.on('get_account_by_id', getUserData);        
        socket?.on("get_updated_post", (response) => setPost(response.updated_post));
        socket?.on("account_changes", handelUserChanges);
        return () => {
            socket?.off('get_account_by_id', getUserData);
            socket?.off("get_updated_post", setPost);
            socket?.off("account_changes", handelUserChanges);
        }
    }, [
        socket,
        dispatch,
        lastScrollY,
        userSelector,
        windowSize.width,
        navigate,
        width,
    ])
    
    const friendshipComponent = () => {
        let friendship = userSelector?.friends?.filter(f => f?._id.toString() === accountId.toString());
        friendship = !friendship || friendship?.length === 0 ? null : friendship[0];

        if(!friendship) {
            return (
                <div 
                    className='friendship-container' 
                    style={{ 
                        left: isBrowser && "60px",
                        top:"20px",
                        right: !isBrowser && "10px",
                        backgroundColor: Colors.blackBlue
                    }}
                >
                    <div 
                        style={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center"
                            
                        }} 
                        onClick={() => socket?.emit("send_friendship_request", {acccountId: accountId })}
                    >
                        <IoMdPersonAdd
                            color='#FFFFFF'
                            size={"20px"}
                        />
                        {
                            labelVisbilty &&
                            <label style={{
                                fontFamily:"italic",
                                color:"#FFFFFF",
                                marginLeft:"5px"
                            }}>
                                Friendship request
                            </label>
                        }
                    </div>
                </div>
            )
        }
        if(friendship.status === "requsted") {
            return (
                <div 
                    className='friendship-container' 
                    style={{ 
                        left: isBrowser && "60px",
                        top:"20px",
                        right: !isBrowser && "10px",
                        backgroundColor: "grey"
                    }}
                >
                    <div 
                        style={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center"
                            
                        }} 
                        onClick={() => {
                            setCostumeModalMessage({
                                message:"Are you sure you want to cancel the membership request?",
                                fontColor:"#FFFFFFFF"
                            });
                            setCostumeModalButtons([
                                {text:"No", onClick: () => {
                                    setCostumeModalMessage("");
                                    setCostumeModalButtons([]);
                                    setCostumModalVisible(false);
                                }},
                                {text: "Yes", onClick:() => {
                                    socket?.emit("cancel_friendship", {acccountId: accountId });
                                    setCostumeModalMessage("");
                                    setCostumeModalButtons([]);
                                    setCostumModalVisible(false);
                                }}
                            ])
                            setCostumModalVisible(true);
                        }}
                    >
                        <BiHistory
                            color='#FFFFFF'
                            size={"20px"}
                        />
                        {
                            labelVisbilty &&
                            <label style={{
                                fontFamily:"italic",
                                color:"#FFFFFF",
                                marginLeft:"5px"
                            }}>
                                Request was Send
                            </label>
                        }
                    </div>
                </div>
            )
        }
        
        if(friendship.status === "wait") {
            return (
                <div 
                    className='confirm-or-ignore-container'
                    style={{ 
                        left: isBrowser && "60px",
                        top:"20px",
                        right: !isBrowser && "10px",
                    }}
                >
                    <div style={{
                        border:"1px solid #FFFFFF",
                        borderRadius:"20px",
                        padding:"10px",
                        backgroundColor:"green",
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center"
                    }} onClick={() => socket?.emit("confirm_friendship", {acccountId: accountId })}>
                        <GiConfirmed
                            color='#FFFFFF'
                        />
                        {
                            labelVisbilty &&
                            <label style={{
                                fontFamily:"italic",
                                color:"#FFFFFF",
                                marginLeft:"5px"
                            }}>
                                Confirm
                            </label>
                        }
                    </div>

                    <div style={{
                        border:"1px solid #FFFFFF",
                        borderRadius:"20px",
                        padding:"10px",
                        backgroundColor:"red",
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        marginLeft:"5px"
                    }} onClick={() => socket?.emit("cancel_friendship", {acccountId: accountId })}>
                        <AiOutlineClose
                            color='#FFFFFF'
                        />
                        {
                            labelVisbilty &&
                            <label style={{
                                fontFamily:"italic",
                                color:"#FFFFFF",
                                marginLeft:"5px"
                            }}>
                                Ignore
                            </label>
                        }
                    </div>   
                </div>
                    
            )
        }

        if(friendship.status === "friend") {
            return (
                <div 
                    className='friendship-container' 
                    style={{ 
                        left: isBrowser && "60px",
                        top:"20px",
                        right: !isBrowser && "10px",
                        backgroundColor: Colors.blackBlue
                    }}
                    onClick={() => {
                        setCostumeModalMessage({
                            message:"Are you sure you want to remove this friendship?",
                            fontColor:"#FFFFFFFF"
                        });
                        setCostumeModalButtons([
                            {text:"No", onClick: () => {
                                setCostumeModalMessage("");
                                setCostumeModalButtons([]);
                                setCostumModalVisible(false);
                            }},
                            {text: "Yes", onClick:() => {
                                socket?.emit("cancel_friendship", {acccountId: accountId });
                                setCostumeModalMessage("");
                                setCostumeModalButtons([]);
                                setCostumModalVisible(false);
                            }}
                        ])
                        setCostumModalVisible(true);
                    }}
                >
                    <div 
                        style={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center"
                            
                        }} 
                    >
                        <BsFillPersonFill
                            color='#FFFFFF'
                            size={"20px"}
                        />
                        {
                            labelVisbilty &&
                            <label style={{
                                fontFamily:"italic",
                                color:"#FFFFFF",
                                marginLeft:"5px"
                            }}>
                                Friend
                            </label>
                        }
                    </div>
                </div>
            )
        }
    }
    
    return (  
        <div className='account-main-container'>
            {
                mediaToDisplay 
                && 
                <DisplayMediaModal 
                    media={mediaToDisplay} 
                    setMedia={setMediaToDisplay}
                />
            }
            {
                likersVisible &&
                <PostLikersModal
                    close={() => setLikersVisible(false)}
                    likers={likersArray}
                    account={userSelector}
                />
            }
            {
                commentVisible &&
                <PostComments
                    close={() => setCommentVisible(false)}
                    post={post}
                    setPost={setPost}
                    account={userSelector}
                    socket={socket}
                />
            }
            {
                costumeMoadlVisible &&
                <CostumModal
                    message={costumeModalMessage}
                    buttons={costumeModalButtons}
                    backgroundColor={Colors.blackBlue}
                    width={"300px"}
                    height={"150px"}
                />
            }
            <div className='account-page-body'>
                <div className='x-icon-container' onClick={() => {navigate(-1)}}>
                    <AiOutlineClose
                        color='#FFFFFF'
                    />
                </div>
                {
                    width * 0.5 < windowSize.width && 
                    <div>
                        
                        {friendshipComponent()}

                        <div 
                            className='friendship-container' 
                            style={{ 
                                left: isBrowser && "60px",
                                top:"80px",
                                right: !isBrowser && "10px"
                            }}
                        >
                            <div style={{
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center"
                                
                            }}>
                                <AiFillMessage
                                    color='#FFFFFF'
                                    size={"20px"}
                                />
                                {
                                    labelVisbilty &&
                                    <label style={{
                                        fontFamily:"italic",
                                        color:"#FFFFFF",
                                        marginLeft:"5px"
                                    }}>
                                        Send message
                                    </label>
                                }
                            </div>
                        </div>
                    </div>
                }
                
                <div
                    className='scrollbar'
                    id='scroll-bar'
                >
                    <div className='account-details-part'
                        style={{
                            backgroundColor: Colors.blueBold,
                        }}
                    >
                        <img
                            alt='profile'
                            src={userData?.profileImage}
                            style={{
                                width:"100px",
                                height:"100px",
                                borderRadius:"50%",
                                border:`2px solid ${Colors.blueLight}`,
                                boxShadow:"#000000 0px 5px 15px"
                            }}
                        />
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            backgroundColor:"#FFFFFF",
                            margin:"10px",
                            borderRadius:"20px",
                            boxShadow:"#000000 0px 5px 15px"
                        }}>
                            <label style={{
                                fontFamily:"italic",
                                color: Colors.blueLight,
                                margin:"10px"
                            }}>
                                <span style={{ color:Colors.blueMedium }}>Email: </span>
                                {userData?.email}
                            </label>
                            <label style={{
                                fontFamily:"italic",
                                color: Colors.blueLight,
                                margin:"10px"
                            }}>
                                <span style={{ color:Colors.blueMedium }}>Name: </span>
                                {userData?.fname + " " + userData?.lname}
                            </label>
                        </div>
                    </div>
                    <div className='account-posts-part'>
                            {
                                userData?.posts?.sort((a, b) => (new Date(b.creatAdt) - new Date(a.creatAdt)))
                                .map((item, index) => 
                                    <Post 
                                        key={item?._id}
                                        post={item}
                                        account={userSelector}
                                        setLikersVisible={setLikersVisible}
                                        setLikersArray={setLikersArray}
                                        setCommentVisible={setCommentVisible}
                                        setPost={setPost}
                                        socket={socket}
                                        setMediaToDisplay={setMediaToDisplay}
                                    />
                                )

                            }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtherAccount;