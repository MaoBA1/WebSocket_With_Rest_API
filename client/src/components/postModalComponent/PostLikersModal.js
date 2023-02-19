import React from 'react';
import '../../utilities/post.css';
import { AiOutlineClose } from 'react-icons/ai';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Colors from '../../utilities/Colors';

function PostLikersModal({ account, likers, close }) {
    
    return (  
        <div className='post-likers-container'>
            <div className='post-likers-background'/>
            <div className='post-likers-body'>
                <div className='post-likers-close-icon' onClick={close}>
                    <AiOutlineClose
                        color='#FFFFFF'
                    />
                </div>
                <Scrollbars
                   universal
                >
                    <div
                        style={{ 
                            marginTop:"60px",
                            borderTop:"1px solid grey",
                        }}
                    >
                    {
                        likers.sort((a,b) => (a - b)).map((item, index) => 
                            <div 
                                key={item._id}
                                className="liker-row"
                            >
                                <img
                                    src={item.profileImage}
                                    style={{
                                        width:"40px",
                                        height:"40px"
                                    }}
                                />
                                <label style={{
                                    fontFamily:"italic",
                                    marginLeft:"10px",
                                    color: Colors.blueLight
                                }}>
                                    {account._id === item._id ? "Me" : item.fname + " " + item.lname}
                                </label>
                            </div>
                        )
                    }
                    </div>
                </Scrollbars>
            </div>
        </div>
    );
}

export default PostLikersModal;