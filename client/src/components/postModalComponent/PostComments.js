import React from 'react';
import '../../utilities/post.css';
import { AiOutlineClose } from 'react-icons/ai';
import { Scrollbars } from 'react-custom-scrollbars-2';

function PostComments({ commentsArray, close }) {
    return (  
        <div className='comments-modal-container'>
            <div className='comment-modal-background'/>
            <div className='comment-modal-body'>
                <div className='post-likers-close-icon' onClick={close}>
                    <AiOutlineClose
                        color='#FFFFFF'
                    />
                </div>
            </div>
        </div>
    );
}

export default PostComments;