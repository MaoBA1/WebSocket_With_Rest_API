import React from 'react';
import Colors from '../utilities/Colors';
import '../utilities/profileSetting.css';
import { BsFillPencilFill } from 'react-icons/bs';
import { isBrowser } from 'react-device-detect';


function ProfileSetting({ account }) {

    // const {
    //     _id,
    //     email,
    //     fname,
    //     lname,
    //     posts,
    //     profileImage
    // } = account;

    const profileImage = account?.profileImage;
    const fname = account?.fname;
    const lname = account?.lname;
    const email = account?.email;

    return ( 
        <div
            className='profile-setting-container'
        >
            <div>
                <div style={{
                    backgroundColor: "grey",
                    width:"35px",
                    height:"35px",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    position:"absolute",
                    borderRadius:"50%",
                    marginLeft:"95px",
                    marginTop:"-5px"
                }}>
                    <BsFillPencilFill
                        color='#FFFFFF'
                    />
                </div>
                <img
                    src={profileImage}
                    style={{
                        width:"120px",
                        height:"120px",
                        border:`2px solid ${Colors.blueLight}`,
                        borderRadius:"20px"
                    }}
                />
            </div>

            <form className='form' style={{
                width: isBrowser ? "90%" : "max-content"
            }}>
                    <div className='form-div'>
                        <label className='form-label' style={{ fontFamily:"italic" }}>
                            Email: 
                            <span className='form-span'>
                                {email}
                            </span>
                        </label>
                    </div>

                    <div className='form-div'>
                        <label className='form-label' style={{ fontFamily:"italic" }}>
                            First Name: 
                            <span className='form-span'>
                                {fname}
                            </span>
                        </label>
                    </div>

                    <div className='form-div'>
                        <label className='form-label' style={{ fontFamily:"italic" }}>
                            Last Name: 
                            <span className='form-span'>
                                {lname}
                            </span>
                        </label>
                    </div>
            </form>
        </div>
    );  
}

export default ProfileSetting;