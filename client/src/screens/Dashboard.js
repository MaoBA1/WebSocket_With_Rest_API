import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.io';
import '../utilities/dashboard.css';
import Colors from '../utilities/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { isBrowser } from 'react-device-detect';
import { isAuthUser } from '../store/actions/index';
// import { Scrollbars } from 'react-custom-scrollbars-2';

// components
import AfterLoginHeader from '../components/AfterLoginHeader';
import SideBar from '../components/SideBar';
import Feed from '../tabs/Feed';
import ProfileSetting from '../tabs/ProfileSetting';
import Friends from '../tabs/Friends';
import Chats from '../tabs/Chats';
import UploadPostModal from '../components/UploadPostModal';


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

        socket.on("auth_user", (response) => isAuthUser(response, dispatch));

        return () => {
            socket.off("auth_user", isAuthUser);
        }
    },[dispatch])
    
    

    return ( 
        <div className='screen-container'>
            <SideBar
                flex={menuCollapsed ? 0 : isBrowser ? 0.25 : 0.3 }
                height={windowSize.height}
                menuCollapsed={menuCollapsed}
                currentTab={currentTab}
                switchTab={setCurrentTab}
                setMenuCollapsed={setMenuCollapsed}
            />
            {UploadPostModalVisible && <UploadPostModal setIsVisible={setUploadPostModalVisible}/>}
            <div className='main' 
                onClick={() => {
                    if(!menuCollapsed) {
                        setMenuCollapsed(true);
                    }
                }} 
                style={{
                    backgroundColor: Colors.creamyWhite,
                    height: windowSize.height,
                    flex: menuCollapsed ? 1 : isBrowser ? 0.75 : 0.7,
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