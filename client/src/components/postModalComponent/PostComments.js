import React, { useState } from 'react';
import '../../utilities/post.css';
import { AiOutlineClose } from 'react-icons/ai';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Colors from '../../utilities/Colors';
import { socket } from '../../socket.io';
function PostComments({ account, post, setPost, close }) {
    const postId = post?._id;
    const postAuthorId = post?.postAuthor?._id;
    const postAuthorFname = post?.postAuthor?.fname;
    const postAuthorLname = post?.postAuthor?.lname;
    const postAuthorProfileImage = post?.postAuthor?.profileImage;
    const postContent = post?.postContent;
    const postComments = post?.comments;

    const [ comment, setComment ] = useState("");

    const sendComment = () => {
        socket.emit("add_comment_to_post", { postId: postId, comment: comment, account: account });
        setComment("");
    }
    return (  
        <div className='comments-modal-container'>
            <div className='comment-modal-background'/>
            <div className='comment-modal-body'>
                <div className='post-likers-close-icon' onClick={() => {
                    setPost(null);
                    close();
                }}>
                    <AiOutlineClose
                        color='#FFFFFF'
                    />
                </div>
                <div style={{ 
                        flex:0.1,
                        width:"100%",
                        display:"flex",
                        flexDirection: "column",
                        justifyContent:"center",
                        paddingLeft:"20px"
                    }}
                >
                    <div className='post-author-part-container'>
                        <img
                            src={postAuthorProfileImage}
                            style={{
                                width:"50px",
                                height:"50px",
                                borderRadius:"50%",
                                border:`1px solid ${Colors.blueLight}`
                            }}
                        />

                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            marginLeft:"10px",
                        }}>
                            <label style={{
                                fontFamily:"italic",
                                fontSize:"16px",
                                color:Colors.blueLight
                            }}>
                                {postAuthorFname + " " + postAuthorLname}
                            </label>
                            
                        </div>
                    </div>
                    <div className='post-content-conatiner'>
                        <label style={{
                            fontFamily:"italic",
                            fontSize:"14px"
                        }}>
                            {postContent.slice(0, 100)}{postContent.length > 100 && "......."}
                        </label>
                    </div>
                </div>
                <div className='comments-container'
                    style={{
                        width:"90%",
                        border:`1px solid ${Colors.blueLight}`,
                        borderRadius:"20px"
                    }}
                >
                    
                        {
                            postComments.length === 0 ?
                            (
                                <div style={{
                                    width:"100%",
                                    height:"100%",
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    backgroundColor:Colors.grey,
                                    borderRadius:"20px",
                                    border:`1px solid ${Colors.blueLight}`,
                                }}>
                                    <label style={{
                                        fontFamily:"italic",
                                        fontSize:"20px",
                                        color: Colors.blueLight,
                                        textAlign:"center"
                                    }}>
                                        Be The first to comment on this post
                                    </label>
                                </div>
                            )
                            :
                            (
                                <Scrollbars style={{
                                    border:`1px solid ${Colors.blueLight}`,
                                    borderRadius:"20px",
                                    backgroundColor:Colors.grey,
                                    padding:"5px"
                                }}>
                                    {
                                        postComments.sort((a, b) => (new Date(b.creatAdt) - new Date(a.creatAdt))).map((item, index) => 
                                            <div key={item._id} style={{
                                                width:"100%",
                                                padding:"10px",
                                                display:"flex",
                                                flexDirection:"column",
                                                backgroundColor: "#FFFFFF",
                                                borderBottom:`1px solid ${Colors.blueLight}`
                                            }}>
                                                <div style={{
                                                    display:"flex",
                                                    flexDirection:"row",
                                                    alignItems:"center",
                                                    justifyContent:"space-between"
                                                }}>
                                                    <div>
                                                        <img
                                                            src={item.commentAuthor.profileImage}
                                                            style={{
                                                                width:"30px",
                                                                height:"30px",
                                                                borderRadius:"20px"
                                                            }}
                                                        />
                                                        <label style={{
                                                            marginLeft:"10px",
                                                            fontFamily:"italic",
                                                            color:Colors.blueLight,
                                                            fontSize:"14px"
                                                        }}>
                                                            {item.commentAuthor.fname + " " + item.commentAuthor.lname}
                                                        </label>
                                                    </div>
                                                    <label style={{
                                                        fontFamily:"italic",
                                                        fontSize:"10px",
                                                        color:"grey",
                                                        marginTop:"5px"
                                                    }}>
                                                        {new Date(item.creatAdt).toDateString()}
                                                    </label>
                                                </div>
                                                <label style={{
                                                    marginLeft:"45px",
                                                    fontFamily:"italic"
                                                }}>
                                                    {item.comment}
                                                </label>
                                            </div>
                                        )
                                    }
                                </Scrollbars> 
                            )
                        }
                    
                </div>
                <div style={{
                        flex:0.1,
                        width:"90%",
                        display:"flex",
                        flexDirection:"row",
                        borderRadius:"20px",
                        border:`1px solid ${Colors.blueLight}`
                    }}
                >
                    <textarea
                        style={{
                            flex:1,
                            borderTopLeftRadius:"20px",
                            borderBottomLeftRadius:"20px",
                            border:"0px",
                            borderRight:`1px solid ${Colors.blueLight}`,
                            padding:"10px",
                            fontFamily:"italic",
                        }}
                        multiple={false}
                        placeholder={"This is the place to comment..."}
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <button onClick={sendComment} style={{
                        flex:0.0,
                        borderRadius:"0px",
                        height:"100%",
                        backgroundColor: Colors.blueLight,
                        fontFamily:"italic",
                        borderBottomRightRadius:"20px",
                        borderTopRightRadius:"20px",
                        border:"0px",
                        borderLeft:`1px solid ${Colors.blueLight}`
                    }}>
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostComments;