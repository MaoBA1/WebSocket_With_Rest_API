import React, { useEffect, useState } from 'react';
import '../utilities/chat.css';
import '../utilities/createNewChat.css';
import { isBrowser } from 'react-device-detect';
import Colors from '../utilities/Colors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

function CreatNewChat({ socket }) {
    const navigate = useNavigate();
    const [ option, setOption ] = useState("private");
    const userSelector = useSelector(state => state.Reducer.User);
    const friends = userSelector?.friends;
    const [ accountFriends, setAccountFriends ] = useState(null);
    const [ searchText, setSearchText ] = useState("");
    const [ participants, setParticipants ] = useState([]);

    useEffect(() => {
        if(!socket) {
            navigate(-1);
        }
        if(!accountFriends) {
            socket?.emit("get_all_user_friend", { friends });
        }
        socket?.on("get_all_user_friend", ({ AllFriendsAccounts }) => {
            setAccountFriends(
                AllFriendsAccounts?.filter(f => f.status === "friend")
                .sort((a,b) => { 
                    if(a?.fname + " " + a?.lname > b?.fname + " " + b?.lname) {
                        return -1;
                    } else if(a?.fname + " " + a?.lname < b?.fname + " " + b?.lname) {
                        return 1;
                    }
                    return 0;
                })
            )
        });

        return () => {
            socket?.off("get_all_user_friend", setAccountFriends);
        }
    },[
        navigate,
        socket,
        accountFriends,
        friends
    ])

    const listOfContacts = () => {
        if(searchText.length === 0) return accountFriends;
        return accountFriends?.filter(item => (item?.fname + item?.lname).toLowerCase()?.includes(searchText.toLowerCase()))
    }

    const markOrRemove = (id) => {
        if(participants.includes(id)) {
            console.log("icluded now remove");
            setParticipants(participants.filter(p => p !== id));
        } else {
            let newListOfPraticipants = participants;
            newListOfPraticipants.push(id);
            console.log(newListOfPraticipants);
            setParticipants(newListOfPraticipants);
        }
        
    }

    return (  
        <div className='account-main-container'>
            <div 
                className='page-container'
                style={{ 
                    width: !isBrowser && "90%",
                    height: !isBrowser && "80%" ,
                    gridTemplateRows: !isBrowser && "15% 12%"
                }}
            >
                <div 
                    className='x-icon-container' 
                    onClick={() => {navigate(-1)}}
                    style={{
                        top:10,
                        left:5
                    }}
                >
                    <AiOutlineClose
                        color='#FFFFFF'
                    />
                </div>

                <div
                    className='header-option-container'
                >
                    <div
                         style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            width:"50%",
                            height:"100%",
                        }}
                         onClick={() => {
                            if(option === "group") {
                                setOption("private");
                                setSearchText("");
                            }
                        }}
                    >
                        <label 
                            style={{
                                fontFamily:"italic",
                                color:"#FFFFFFFF",
                                textShadow: option === "private" && `0px 5px 10px #FFFFFF`,
                                fontSize: option === "private" ? "18px" : "15px",
                                borderBottom: option === "private" && "1px solid #FFFFFF"
                            }}
                        >
                            Private
                        </label>
                    </div>

                    <div
                         style={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            width:"50%",
                            height:"100%",
                        }}
                         onClick={() => {
                            if(option === "private") {
                                setOption("group");
                                setSearchText("");
                            }
                        }}
                    >
                        <label 
                            style={{
                                fontFamily:"italic",
                                color:"#FFFFFFFF",
                                textShadow: option === "group" && `0px 5px 10px #FFFFFF`,
                                fontSize: option === "group" ? "18px" : "16px",
                                borderBottom: option === "group" && "1px solid #FFFFFF"
                            }}
                        >
                            Group
                        </label>
                    </div>
                </div>
                <div
                    className='search-container'
                >
                    <input
                        style={{
                            width:"80%",
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            backgroundColor:Colors.grey,
                            border:`2px solid ${Colors.blueBold}`,
                            fontFamily:"italic",
                            fontSize:"16px",
                            color:Colors.blueLight,
                            height:"35px"
                        }}
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="Search for a contact..."
                    />
                </div>

                {
                    option === "private" &&
                    <>
                        {
                            accountFriends ?
                            (
                                <>
                                    {
                                        accountFriends?.length > 0 ?
                                        (
                                            <div>
                                                {
                                                    listOfContacts()?.map((item, index) => 
                                                        <div key={item?._id} style={{
                                                            borderBottom: "0.5px solid grey",
                                                            height:"50px",
                                                            display:"flex",
                                                            flexDirection:"row",
                                                            alignItems:"center",
                                                            paddingLeft:"10px"
                                                        }} onClick={() => navigate(`/Home/chatScreen/${item?._id}`)}>
                                                            <img
                                                                alt='profile'
                                                                src={item?.profileImage}
                                                                style={{
                                                                    width:"40px",
                                                                    height:"40px",
                                                                    borderRadius:"50%"
                                                                }}
                                                            />
                                                            <label style={{
                                                                marginLeft:"10px",
                                                                fontFamily:"italic",
                                                                color: Colors.blueLight
                                                            }}>
                                                                {item?.fname + " " + item?.lname}
                                                            </label>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                        :
                                        (
                                            <div
                                                style={{
                                                    display:"flex",
                                                    flexDirection:"column",
                                                    alignItems:"center",
                                                    justifyContent:"center"
                                                }}
                                            >
                                                <label style={{
                                                    fontFamily:"italic",
                                                    fontSize:"18px",
                                                    textAlign:"center",
                                                    color: Colors.blueLight
                                                }}>
                                                    You don't have friends yet, start making new connections!
                                                </label>
                                            </div>
                                        )

                                    }  
                                </>
                            )
                            :
                            (
                                <div className='messages-container-loading'/>
                            )
                            
                        }
                    </>
                }

                {
                    option === "group" &&
                    <>
                        {
                            accountFriends ?
                            (
                                <>
                                    {
                                        accountFriends?.length > 0 ?
                                        (
                                            <div>
                                                {
                                                    listOfContacts()?.map((item, index) => 
                                                        <div key={item?._id} style={{
                                                            borderBottom: "0.5px solid grey",
                                                            height:"50px",
                                                            display:"flex",
                                                            flexDirection:"row",
                                                            alignItems:"center",
                                                            paddingLeft:"10px"
                                                        }}>
                                                            <img
                                                                alt='profile'
                                                                src={item?.profileImage}
                                                                style={{
                                                                    width:"40px",
                                                                    height:"40px",
                                                                    borderRadius:"50%"
                                                                }}
                                                            />
                                                            <label style={{
                                                                marginLeft:"10px",
                                                                fontFamily:"italic",
                                                                color: Colors.blueLight
                                                            }}>
                                                                {item?.fname + " " + item?.lname}
                                                            </label>

                                                            <div
                                                                style={{
                                                                    backgroundColor: Colors.blueLight,
                                                                    width:"30px",
                                                                    height:"30px",
                                                                    borderRadius:"50%",
                                                                    position:"absolute",
                                                                    right:10,
                                                                    border: `1px solid ${Colors.blueBold}`,
                                                                    display:"flex",
                                                                    flexDirection:"column",
                                                                    alignItems:"center",
                                                                    justifyContent:"center"
                                                                }}
                                                                onClick={() => markOrRemove(item?._id)}
                                                            >
                                                                {
                                                                    participants?.includes(item?.id) &&
                                                                    <div
                                                                        style={{
                                                                            backgroundColor: "#FFFFFFFF",
                                                                            width:"10px",
                                                                            height:"10px",
                                                                            borderRadius:"50%"
                                                                        }}
                                                                    />
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                        :
                                        (
                                            <div
                                                style={{
                                                    display:"flex",
                                                    flexDirection:"column",
                                                    alignItems:"center",
                                                    justifyContent:"center"
                                                }}
                                            >
                                                <label style={{
                                                    fontFamily:"italic",
                                                    fontSize:"18px",
                                                    textAlign:"center",
                                                    color: Colors.blueLight
                                                }}>
                                                    You don't have friends yet, start making new connections!
                                                </label>
                                            </div>
                                        )

                                    }  
                                </>
                            )
                            :
                            (
                                <div className='messages-container-loading'/>
                            )
                            
                        }
                    </>
                }
            </div>
        </div>
    );
}

export default CreatNewChat;