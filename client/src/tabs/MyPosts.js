import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../utilities/myPosts.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Post from '../components/Post';

function MyPosts({ account }) {
    const allPostSelector = useSelector(state => state.Reducer.Posts);
    
    
    return (  
        <Scrollbars>
            <div className='my-post-container'>
                {
                    allPostSelector?.filter(p => p.postAuthor._id.toString() === account._id.toString())
                    .sort((a, b) => (new Date(b.creatAdt) - new Date(a.creatAdt))).map((item, index) =>
                        <Post
                            key={item._id}
                            post={item}
                            account={account}
                        />
                    )
                }
            </div>
        </Scrollbars>
    );
}

export default MyPosts;