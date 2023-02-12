import React from 'react';
import '../utilities/feed.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Colors from '../utilities/Colors';
import { AiOutlinePlus } from 'react-icons/ai';

function Feed({ account }) {
    const {
        _id,
        email,
        fname,
        lname,
        posts,
        profileImage
    } = account;

    return ( 
        <Scrollbars className='feed-container'>
            <div
                className='upper-line-container'
            >
                <label style={{
                    fontFamily:"italic",
                    color: Colors.blueLight,
                    fontStyle:'italic',
                    textAlign:"center"
                }}>
                    Welcome {fname}
                </label>

                <button style={{
                    backgroundColor: Colors.blueLight,
                    border:"0px",
                    width:"max-content",
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    height:"max-content",
                    fontFamily:"italic",
                    fontSize:"14px",
                    textAlign:"center"
                }}>
                    <AiOutlinePlus
                        color='#FFFFFF'
                        style={{ margin:"2px" }}
                    />
                    Add new post
                </button>
            </div>

            <div className='search-line-container'>
                <input
                    style={{
                        width:"80%",
                        height:"20px",
                        backgroundColor: Colors.grey,
                        border:`1px solid ${Colors.blueLight}`,
                        fontFamily:"italic",
                        color: Colors.blueLight
                    }}
                    placeholder="Search..."
                />
            </div>
        </Scrollbars>
    );
}

export default Feed;