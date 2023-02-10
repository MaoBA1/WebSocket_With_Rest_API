import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { socket } from '../socket.io';
import '../utilities/dashboard.css';
import Colors from '../utilities/Colors';
import { useSelector } from 'react-redux';


// components
import AfterLoginHeader from '../components/AfterLoginHeader';
import SideBar from '../components/SideBar';


function Dashboard( props ) {
    const [  menuCollapsed, setMenuCollapsed ] = useState(true);
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const navigate = useNavigate();
    const userSelector = useSelector(state => state.Reducer.User);
    
    const {
        // _id,
        // email,
        // fname,
        // lname,
        // posts,
        profileImage
    } = userSelector;
    
    useEffect(() => {
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handelResize);
    },[])
    
    const moveToCurrentUserProfile = () => {
        navigate("/Currentuserprofile");
    }

    return ( 
        <div className='screen-container'>
            <SideBar
                flex={menuCollapsed ? 0 : 0.35}
                height={windowSize.height}
                menuCollapsed={menuCollapsed}
                moveToCurrentUserProfile={moveToCurrentUserProfile}
            />
            <div className='main' style={{
                backgroundColor: Colors.creamyWhite,
                height: windowSize.height,
                flex: menuCollapsed ? 1 : 0.65,
            }}>
                <AfterLoginHeader
                    title={"Feed"}
                    profileImage={profileImage}
                    setMenuCollapsed={setMenuCollapsed}
                    menuCollapsed={menuCollapsed}
                    moveToCurrentUserProfile={moveToCurrentUserProfile}
                />
            </div>
        </div>
    );
}

export default Dashboard;