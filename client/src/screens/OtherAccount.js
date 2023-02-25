import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import serverBaseUrl from '../serverBaseUrl';
import '../utilities/otherAccount.css';
import Scrollbars from 'react-custom-scrollbars-2';
import { AiOutlineClose } from 'react-icons/ai';
import Colors from '../utilities/Colors';
import Post from '../components/Post';
import { useSelector } from 'react-redux';
import DisplayMediaModal from '../components/DisplayMediaModal';
import PostLikersModal from '../components/postModalComponent/PostLikersModal';
import PostComments from '../components/postModalComponent/PostComments';



function OtherAccount({ socket, setupSocket }) {
    const navigate = useNavigate();
    const { accountId } = useParams();
    const [ userData, setUserData ] = useState(null);
    const [ mediaToDisplay, setMediaToDisplay ] = useState(null);
    const [ likersVisible, setLikersVisible ] = useState(false);
    const [ likersArray, setLikersArray ] = useState([]);
    const [ commentVisible, setCommentVisible ] = useState(false);
    const [ post, setPost ] = useState(null);
    const userSelector = useSelector(state => state.Reducer.User);
    
    
    socket?.emit('get_account_by_id', { accountId: accountId });
    useEffect(() => {
        setupSocket();
        const getUserData = (data) => {
            if(data.status) {
                setUserData(data.account);
            }
        }
        socket?.on('get_account_by_id', getUserData);        

        return () => {
            socket?.off('get_account_by_id', getUserData);
        }
    }, [socket, setupSocket])

    // console.log(userData);
    
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
            <div className='account-page-body'>
                <div className='x-icon-container' onClick={() => {navigate(-1); socket.disconnect();}}>
                    <AiOutlineClose
                        color='#FFFFFF'
                    />
                </div>
                <Scrollbars className='scrollbar'>
                    <div className='account-details-part'
                        style={{
                            backgroundColor: Colors.blueBold
                        }}
                    >
                        <img
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
                                userData?.posts?.sort((a, b) => (new Date(b.creatAdt) - new Date(a.creatAdt))).
                                map((item, index) => 
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
                </Scrollbars>
            </div>
        </div>
    );
}

export default OtherAccount;