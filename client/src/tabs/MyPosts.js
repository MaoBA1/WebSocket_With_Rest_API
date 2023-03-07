import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../utilities/myPosts.css';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Post from '../components/Post';
import Colors from '../utilities/Colors';

function MyPosts({ account, socket, setCommentVisible, setPost, setLikersArray, setLikersVisible, setMediaToDisplay }) {
    const allPostSelector = useSelector(state => state.Reducer.Posts);
    
    return (  
        <Scrollbars>
            <div style={{
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                marginTop:"30px"
            }}>
                {
                    allPostSelector?.filter(p => p.postAuthor._id.toString() === account._id.toString())
                    .sort((a, b) => (new Date(b.creatAdt) - new Date(a.creatAdt))).map((item, index) =>
                        <Post
                            key={item._id}
                            post={item}
                            account={account}
                            socket={socket}
                            setCommentVisible={setCommentVisible}
                            setPost={setPost}
                            setLikersArray={setLikersArray}
                            setLikersVisible={setLikersVisible}
                            setMediaToDisplay={setMediaToDisplay}                 
                        />
                    )
                }
                {
                    allPostSelector?.filter(p => p.postAuthor._id.toString() === account._id.toString())?.length === 0 &&
                    <div
                        style={{
                            width:"100%",
                            height:"100%",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            position:"absolute",
                            padding:"5px"
                        }}
                    >   
                        <label style={{
                            fontFamily:"italic",
                            fontSize:"30px",
                            color: Colors.blueBold,
                            textAlign:"center"
                        }}>
                            You have not uploaded any post yet...
                        </label>
                    </div>
                    
                }
            </div>
        </Scrollbars>
    );
}

export default MyPosts;