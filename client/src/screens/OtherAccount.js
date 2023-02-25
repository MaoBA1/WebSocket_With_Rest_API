import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import serverBaseUrl from '../serverBaseUrl';
import '../utilities/otherAccount.css';
import Scrollbars from 'react-custom-scrollbars-2';
import { AiOutlineClose } from 'react-icons/ai';
import Colors from '../utilities/Colors';



function OtherAccount(props) {
    const navigate = useNavigate();
    const { accountId } = useParams();
    const [ userData, setUserData ] = useState(null);
    useEffect(() => {
        const getOtherAccountData = async() => {
            const response = await fetch(serverBaseUrl.url + "/user/getUserById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("user_token")
                },
                body: JSON.stringify({ accountId: accountId })
            })
            const data = await response.json();
            if(data.status) {
                setUserData(data.account);
            }
        }
        getOtherAccountData();
    }, [accountId])

    console.log(userData);
    
    return (  
        <div className='account-main-container'>
            <div className='account-page-body'>
                <div className='x-icon-container' onClick={() => navigate(-1)}>
                    <AiOutlineClose
                        color='#FFFFFF'
                    />
                </div>
                <Scrollbars className='scrollbar'>
                    <div className='account-details-part'>
                        <img
                            src={userData?.profileImage}
                            style={{
                                width:"100px",
                                height:"100px",
                                borderRadius:"50%",
                                border:`2px solid ${Colors.blueLight}`
                            }}
                        />
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
                </Scrollbars>
            </div>
        </div>
    );
}

export default OtherAccount;