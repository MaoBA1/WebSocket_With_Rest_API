import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.io';
import '../utilities/dashboard.css';
import Colors from '../utilities/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { isBrowser } from 'react-device-detect';
import { isAuthUser } from '../store/actions/index';
import { Scrollbars } from 'react-custom-scrollbars-2';

// components
import AfterLoginHeader from '../components/AfterLoginHeader';
import SideBar from '../components/SideBar';
import Feed from '../tabs/Feed';



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
    
    // const {
    //     _id,
    //     email,
    //     fname,
    //     lname,
    //     posts,
    //     profileImage
    // } = userSelector;

    const profileImage = userSelector?.profileImage;
    const fname = userSelector?.fname;
    const lname = userSelector?.lname;
    
    
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
                width={menuCollapsed ? "0%" : isBrowser ? "15%" : "40%" }
                height={windowSize.height}
                menuCollapsed={menuCollapsed}
            />
            <div className='main' style={{
                backgroundColor: Colors.creamyWhite,
                height: windowSize.height,
                width: menuCollapsed ? "100%" : isBrowser ? "85%" : "60%",
            }}>
                <AfterLoginHeader
                    title={"Feed"}
                    profileImage={profileImage}
                    setMenuCollapsed={setMenuCollapsed}
                    menuCollapsed={menuCollapsed}
                    currentTab={currentTab}
                />
                <Scrollbars>
                    <label style={{
                        fontFamily:"italic",
                        color: "gray",
                        fontStyle:'italic'
                    }}>
                        Welcome {fname}
                    </label>
                    { currentTab === "Feed" && <Feed/>}
                </Scrollbars>
            </div>
        </div>
    );
}

export default Dashboard;