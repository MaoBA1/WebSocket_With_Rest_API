import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Colors from '../utilities/Colors';
import { useDispatch, useSelector } from 'react-redux';
import '../utilities/friend.css';
import { isBrowser } from 'react-device-detect';
import { AiOutlineClose } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { BiHistory } from 'react-icons/bi';

function Friends({ account, socket }) {
    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.Reducer.User);
    const friends = userSelector?.friends;
    const [ allFriendsAcconts, setAllFriendsAccounts ] = useState([]);
    const [ intialUserData, setIntialUserData ] = useState(userSelector);
    const [ labelVisbilty, setLabelVisbilty ] = useState(isBrowser);

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
            {
                allFriendsAcconts?.filter(f => f.status === "wait")?.length > 0 &&
                <div style={{
                    paddingLeft:"25px",
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
            }
            <div 
                className='friends-container'
                style={{
                    gridTemplateColumns: isBrowser? "repeat(4, 370px)" : "repeat(2, 180px)",
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

                            <div 
                                className='confirm-or-ignore-container-relative'
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
                                }} onClick={() => socket?.emit("confirm_friendship", {acccountId: item._id })}>
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
                                }} onClick={() => socket?.emit("cancel_friendship", {acccountId: item._id })}>
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
                        </div>
                    )
                }
            </div>
            

            {
                allFriendsAcconts?.filter(f => f.status === "requsted")?.length > 0 &&
                <div style={{
                    paddingLeft:"25px",
                    padding:"10px"
                }}>
                    <label style={{
                        fontFamily:"italic",
                        color: Colors.blueBold,
                        fontSize:"18px"
                    }}>
                        waiting for approve
                    </label>
                </div>
            }
            <div 
                className='friends-container'
                style={{
                    gridTemplateColumns: isBrowser? "repeat(4, 370px)" : "repeat(2, 180px)",
                }}
            >
                {
                    allFriendsAcconts?.filter(f => f.status === "requsted")?.map((item, index) => 
                    
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
                                get friendship request from you
                            </label>

                            <div 
                                className='confirm-or-ignore-container-relative'
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
                                    backgroundColor:"grey",
                                    display:"flex",
                                    flexDirection:"row",
                                    alignItems:"center"
                                }} onClick={() => socket?.emit("cancel_friendship", {acccountId: item._id })}>
                                    <BiHistory
                                        color='#FFFFFF'
                                    />
                                    {
                                        labelVisbilty &&
                                        <label style={{
                                            fontFamily:"italic",
                                            color:"#FFFFFF",
                                            marginLeft:"5px"
                                        }}>
                                            cancel request
                                        </label>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {
                allFriendsAcconts?.filter(f => f.status === "friend")?.length > 0 &&
                <div style={{
                    paddingLeft:"25px",
                    padding:"10px"
                }}>
                    <label style={{
                        fontFamily:"italic",
                        color: Colors.blueBold,
                        fontSize:"18px"
                    }}>
                        your friends
                    </label>
                </div>
            }
            <div 
                className='friends-container'
                style={{
                    gridTemplateColumns: isBrowser? "repeat(4, 370px)" : "repeat(2, 180px)",
                }}
            >
                {
                    allFriendsAcconts?.filter(f => f.status === "friend")?.map((item, index) => 
                    
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
                            
                            <div 
                                className='confirm-or-ignore-container-relative'
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
                                    backgroundColor:"grey",
                                    display:"flex",
                                    flexDirection:"row",
                                    alignItems:"center"
                                }} onClick={() => socket?.emit("cancel_friendship", {acccountId: item._id })}>
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
                                            cancel friendship
                                        </label>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </Scrollbars>
    );
}

export default Friends;