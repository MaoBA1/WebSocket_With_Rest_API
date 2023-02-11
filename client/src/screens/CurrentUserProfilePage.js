import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthUser } from '../store/actions/index';
import { socket } from '../socket.io';
import '../utilities/dashboard.css';
import '../utilities/currentUserProfile.css';
import { isBrowser } from 'react-device-detect';
import Colors from '../utilities/Colors';
import { BiMenu } from 'react-icons/bi';

// components
import SideBar from '../components/SideBar';

function CurrentUserProfileScreen(props) {
    const dispatch = useDispatch();
    const [  menuCollapsed, setMenuCollapsed ] = useState(true);
    const userSelector = useSelector(state => state.Reducer.User);
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

        socket.on("auth_user", (response) => isAuthUser(response, dispatch));

        return () => {
            socket.off("auth_user", isAuthUser);
        }
    },[dispatch]);

    return (
        <div className='screen-container'>
            <SideBar
                width={menuCollapsed ? "0%" : isBrowser ? "15%" : "40%" }
                height={windowSize.height}
                menuCollapsed={menuCollapsed}
                // moveToCurrentUserProfile={moveToCurrentUserProfile}
            />
            <div className='main' style={{
                backgroundColor: Colors.creamyWhite,
                height: windowSize.height,
                width: menuCollapsed ? "100%" : isBrowser ? "85%" : "60%",
            }}>
                <div className='top-bar'>
                    <div style={{
                        flex:0.05,
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <BiMenu
                            color={"#FFFFFF"}
                            size={"30px"}
                            onClick={() => setMenuCollapsed(!menuCollapsed)}
                        />
                    </div>
                    <div style={{
                        flex:0.95,
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                            <img
                                src={profileImage}
                                style={{
                                    width:"100px",
                                    height:"100px",
                                    borderRadius:"50%",
                                    border:"2px solid #FFFFFF",
                                    margin:"5px"
                                }}
                                alt="profileimage"
                            />
                            <label style={{
                                fontFamily:"Bold",
                                color: "#FFFFFF",
                                fontSize:"25px",
                                fontStyle:"italic",
                            }}>
                                {fname} {lname}
                            </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentUserProfileScreen;