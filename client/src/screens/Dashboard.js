import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../utilities/dashboard.css';
import Colors from '../utilities/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { 
    isAuthUser,
    setAllPosts,
    getUser
} from '../store/actions/index';

// components
import AfterLoginHeader from '../components/AfterLoginHeader';
import SideBar from '../components/SideBar';
import Feed from '../tabs/Feed';
import ProfileSetting from '../tabs/ProfileSetting';
import Friends from '../tabs/Friends';
import Chats from '../tabs/Chats';
import UploadPostModal from '../components/UploadPostModal';
import DisplayMediaModal from '../components/DisplayMediaModal';
import MyPosts from '../tabs/MyPosts';
import PostLikersModal from '../components/postModalComponent/PostLikersModal';
import PostComments from '../components/postModalComponent/PostComments';


function Dashboard( { socket, setupSocket } ) {
    const dispatch = useDispatch();
    const [  menuCollapsed, setMenuCollapsed ] = useState(true);
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const navigate = useNavigate();
    const userSelector = useSelector(state => state.Reducer.User);
    const [ currentTab, setCurrentTab ] = useState("Feed");
    const [ UploadPostModalVisible, setUploadPostModalVisible ] = useState(false);
    const [ mediaToDisplay, setMediaToDisplay ] = useState(null);
    const [ likersVisible, setLikersVisible ] = useState(false);
    const [ likersArray, setLikersArray ] = useState([]);
    const [ commentVisible, setCommentVisible ] = useState(false);
    const [ post, setPost ] = useState(null);
    // const {
    //     _id,
    //     email,
    //     fname,
    //     lname,
    //     posts,
    //     profileImage
    // } = userSelector;

    const profileImage = userSelector?.profileImage;
    
    
    
    useEffect(() => {
        setupSocket();
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handelResize);
        const get_user = async () => {
            try {
                await dispatch(getUser(localStorage.getItem("user_token")));
            } catch(error) {
              console.log(error.message);   
            }
        }
        get_user();
        if(!localStorage.getItem("user_token")) {
            navigate("/");
        }
        
        socket?.on("recive_all_post", (response) => setAllPosts(response, dispatch));
        socket?.on("get_updated_post", (response) => setPost(response.updated_post));
        socket?.on("auth_user", (response) => isAuthUser(response, dispatch));

        return () => {
            socket?.off("recive_all_post", setAllPosts);
            socket?.off("get_updated_post", setPost);
            socket?.off("auth_user", isAuthUser);
        }
    },[dispatch, navigate, socket, setupSocket])
    
    

    return ( 
        <div className='screen-container'>
            {
                mediaToDisplay 
                && 
                <DisplayMediaModal 
                    media={mediaToDisplay} 
                    setMedia={setMediaToDisplay}
                />
            }
            <SideBar
                flex={menuCollapsed ? 0 : 0.2 }
                height={windowSize.height}
                menuCollapsed={menuCollapsed}
                currentTab={currentTab}
                switchTab={setCurrentTab}
                setMenuCollapsed={setMenuCollapsed}
                socket={socket}
            />
            {
                UploadPostModalVisible 
                &&
                <UploadPostModal
                    setIsVisible={setUploadPostModalVisible}
                    setMediaToDisplay={setMediaToDisplay}
                    account={userSelector}
                    socket={socket}
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
            <div className='main' 
                onClick={() => {
                    if(!menuCollapsed) {
                        setMenuCollapsed(true);
                    }
                }} 
                style={{
                    backgroundColor: Colors.creamyWhite,
                    height: windowSize.height,
                    flex: menuCollapsed ? 1 : 0.8,
                }}
            >
                <AfterLoginHeader
                    title={"Feed"}
                    profileImage={profileImage}
                    setMenuCollapsed={setMenuCollapsed}
                    menuCollapsed={menuCollapsed}
                    currentTab={currentTab}
                />
                { 
                    currentTab === "Feed" 
                    &&
                    <Feed
                        account={userSelector}
                        menuCollapsed={menuCollapsed}
                        setUploadPostModalVisible={setUploadPostModalVisible}
                        setLikersVisible={setLikersVisible}
                        setLikersArray={setLikersArray}
                        setPost={setPost}
                        setCommentVisible={setCommentVisible}
                        socket={socket}   
                        setMediaToDisplay={setMediaToDisplay}                 
                    />
                }

                { 
                    currentTab === "Profile-Setting" 
                    &&
                    <ProfileSetting
                        account={userSelector}
                        socket={socket}
                    />
                }

                { 
                    currentTab === "My-Posts" 
                    &&
                    <MyPosts
                        account={userSelector}
                        setLikersVisible={setLikersVisible}
                        setLikersArray={setLikersArray}
                        socket={socket}
                        setPost={setPost}
                        setCommentVisible={setCommentVisible}
                        setMediaToDisplay={setMediaToDisplay}
                    />
                }

                { 
                    currentTab === "Friends" 
                    &&
                    <Friends
                        account={userSelector}
                        socket={socket}
                    />
                }

                { 
                    currentTab === "Chats" 
                    &&
                    <Chats
                        account={userSelector}
                        socket={socket}
                    />
                }
            </div>
        </div>
    );
}

export default Dashboard;