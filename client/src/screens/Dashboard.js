import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.io';
import '../utilities/dashboard.css';
import Colors from '../utilities/Colors';
import { useSelector, useDispatch } from 'react-redux';
// import { isBrowser } from 'react-device-detect';
import { 
    isAuthUser,
    setAllPosts,
} from '../store/actions/index';
// import { Scrollbars } from 'react-custom-scrollbars-2';

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


function Dashboard( props ) {
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
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handelResize);

        if(!userSelector) {
            navigate("/");
        }

        socket.on("auth_user", (response) => isAuthUser(response, dispatch));
        socket.on("recive_all_post", (response) => setAllPosts(response, dispatch));
        

        return () => {
            socket.off("auth_user", isAuthUser);
            socket.off("recive_all_post", setAllPosts);
        }
    },[dispatch, useSelector, navigate])
    
    

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
            />
            {
                UploadPostModalVisible 
                &&
                <UploadPostModal
                    setIsVisible={setUploadPostModalVisible}
                    setMediaToDisplay={setMediaToDisplay}
                    account={userSelector}
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
                    />
                }

                { 
                    currentTab === "Profile-Setting" 
                    &&
                    <ProfileSetting
                        account={userSelector}
                    />
                }

                { 
                    currentTab === "My-Posts" 
                    &&
                    <MyPosts
                        account={userSelector}
                    />
                }

                { 
                    currentTab === "Friends" 
                    &&
                    <Friends
                        account={userSelector}
                    />
                }

                { 
                    currentTab === "Chats" 
                    &&
                    <Chats
                        account={userSelector}
                    />
                }
            </div>
        </div>
    );
}

export default Dashboard;