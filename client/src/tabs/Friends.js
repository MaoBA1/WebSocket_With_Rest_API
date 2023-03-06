import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Colors from '../utilities/Colors';
import { useDispatch, useSelector } from 'react-redux';
import '../utilities/friend.css';
import { isBrowser } from 'react-device-detect';
import { setUser } from '../store/actions/index';

function Friends({ account, socket }) {
    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.Reducer.User);
    const friends = userSelector?.friends;
    const [ allFriendsAcconts, setAllFriendsAccounts ] = useState([]);
    const [ intialUserData, setIntialUserData ] = useState(userSelector);

    useEffect(() => {
        if(allFriendsAcconts.length === 0 || userSelector !== intialUserData) {
            socket?.emit("get_all_user_friend", { friends });
            setIntialUserData(userSelector);
        }
        
        

        socket?.on("get_all_user_friend", ({ AllFriendsAccounts }) => {setAllFriendsAccounts(AllFriendsAccounts)});
        return () => {
            socket?.off("get_all_user_friend", setAllFriendsAccounts);
        }
    })
    
    return ( 
        <Scrollbars className='friend-screen-container'>
            <div style={{
                padding:"10px"
            }}>
                <label style={{
                    fontFamily:"italic",
                    color: Colors.blueBold,
                    fontSize:"18px"
                }}>
                    Friendship requests
                </label>
            </div>
            <div 
                className='friends-container'
                style={{
                    gridTemplateColumns: isBrowser? "repeat(4, 370px)" : "repeat(2, 48%)",
                }}
            >
                {
                    allFriendsAcconts?.filter(f => f.status === "wait")?.map((item, index) => 
                    
                        <div key={item?._id} className="friend-array-item">
                            <img
                                alt='profile'
                                style={{ 
                                    width: isBrowser ? "85px" : "60px",
                                    height: isBrowser ? "85px" : "60px",
                                    borderRadius:"50px",
                                    border:`2px solid ${Colors.blueLight}`
                                }}
                                src={item?.profileImage}
                            />
                            <label style={{
                                fontFamily:"italic",
                                color: Colors.blueLight,
                                marginTop:"10px",
                                fontSize: isBrowser ? "18px" : "15px",
                                textAlign:"center"
                            }}>
                                {item.fname + " " + item.lname}
                            </label>
                            <label style={{ 
                                fontFamily:"italic",
                                textAlign:"center",
                                fontSize: isBrowser ? "15px" : "12px",
                            }}>
                                sent you friendship request
                            </label>
                        </div>
                    )
                }
            </div>

        </Scrollbars>
    );
}

export default Friends;