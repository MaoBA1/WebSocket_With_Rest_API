import React from 'react';
import '../../utilities/post.css';
import { AiOutlineClose } from 'react-icons/ai';

function PostLikersModal({ likers, close }) {
    return (  
        <div className='post-likers-container'>
            <div className='post-likers-background'/>
            <div className='post-likers-body'>
                <div className='post-likers-close-icon' onClick={close}>
                    <AiOutlineClose
                        color='#FFFFFF'
                    />
                </div>
            </div>
        </div>
    );
}

export default PostLikersModal;