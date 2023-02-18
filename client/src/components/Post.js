import React, { useState } from 'react';
import '../utilities/post.css';
import Colors from '../utilities/Colors';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { socket } from '../socket.io';


function Post({ post, account }) {
    const postId = post?._id;
    const postAuthorId = post?.postAuthor?._id;
    const postAuthorFname = post?.postAuthor?.fname;
    const postAuthorLname = post?.postAuthor?.lname;
    const postAuthorProfileImage = post?.postAuthor?.profileImage;
    const postContent = post?.postContent;
    const postMedia = post?.postMedia;
    const postCreateAdt = post?.creatAdt;
    const formattedCreateAdt = new Date(postCreateAdt).toDateString();
    const postLikses = post.likes;
    const postComments = post?.comments;

    


    const [ currentMedia, setCurrentMedia ] = useState(0);
    const length = postMedia?.media?.length;
    

    const isLiked = () => {
        return postLikses.filter(l => l._id === account._id).length === 1;

    }

    const like = () => {
        socket.emit("give_like_to_post", {postId: postId, account: account});
    }

    const unlike = () => {
        socket.emit("unlike_post", {postId: postId, accountId: account._id});
    }
    return (  
        <div className='post-container'>
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
                    <label style={{
                        fontFamily:"italic",
                        fontSize:"10px",
                        color:"grey",
                        marginTop:"5px"
                    }}>
                        {formattedCreateAdt}
                    </label>
                </div>
            </div>
            <div className='post-content-conatiner'>
                <label style={{
                    fontFamily:"italic",
                    fontSize:"14px"
                }}>
                    {postContent}
                </label>
            </div>

            {
                postMedia?.mediaExist &&
                <>
                    
                    <section className='silder-container'>
                        <div className='arrow-container'>
                            <BsFillArrowLeftCircleFill
                                color={Colors.blueLight}
                                className='left-arrow'
                                onClick={() => {
                                    setCurrentMedia(currentMedia === 0 ? length - 1 : currentMedia - 1);
                                }}
                            />
                        </div>
                        <div className='media-container'>
                            {
                                postMedia?.media?.map((item, index) => 
                                    
                                        <div
                                            key={item._id} 
                                            className={
                                                index === currentMedia ? 
                                                "slide-active"
                                                :
                                                "slide"
                                            }
                                        >
                                            {
                                                item?.mediaType === "image" ?
                                                (
                                                    <>
                                                        {
                                                            index === currentMedia &&
                                                            <img
                                                                alt="post-image"
                                                                src={item.downloadUrl}
                                                                className="media"
                                                            />
                                                        }
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        {
                                                            index === currentMedia &&
                                                            <video
                                                                alt="post-video"
                                                                src={item.downloadUrl}
                                                                className="media"
                                                                controls
                                                            />
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    
                                )
                                
                            }
                        </div>
                        <div className='arrow-container'>
                            <BsFillArrowRightCircleFill
                                color={Colors.blueLight}
                                className='right-arrow'
                                onClick={() => {
                                    setCurrentMedia(currentMedia === length - 1 ? 0 : currentMedia + 1);
                                }}
                            />
                        </div>
                    </section>
                    <div style={{
                        width:"100%",
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"center",
                        marginTop:"20px"
                    }}>
                        {
                            postMedia?.media?.map((item, index) => 
                                <div 
                                    key={index}
                                    className={currentMedia === index ? "indicator-active" : "indicator"}
                                    onClick={() => setCurrentMedia(index)}
                                />
                            )
                        }
                    </div>
                </>
            }
            <div style={{
                display:"flex",
                flexDirection:"row",
                marginTop:"20px",
                marginLeft:"10px",
            }}>
                <div onClick={() => {}} style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    margin:"5px"
                }}>
                    <label style={{ 
                        fontFamily:"italic",
                        fontSize:"12px",
                        color:"grey"
                    }}>
                        {postLikses?.length}
                    </label>
                    <AiFillLike
                        color='grey'
                        style={{ margin:"5px" }}
                    />
                    <label style={{ 
                        fontFamily:"italic",
                        fontSize:"12px",
                        color:"grey"
                    }}>
                        Likes
                    </label>
                </div>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    margin:"5px"
                }}>
                    <label style={{ 
                        fontFamily:"italic",
                        fontSize:"12px",
                        color:"grey"
                    }}>
                        {postComments?.length}
                    </label>
                    <FaComment
                        color='grey'
                        style={{ margin:"5px" }}
                    />
                    <label style={{ 
                        fontFamily:"italic",
                        fontSize:"12px",
                        color:"grey"
                    }}>
                        Comments
                    </label>
                </div>
            </div>
            <div
                style={{
                    width:"100%",
                    border:`1px solid ${Colors.blueLight}`,
                    marginTop:"10px",
                }}
            />
            <div className='bottom-part-container'>
                <div className='like-and-comment-container' onClick={!isLiked() ? like : unlike}>
                    {
                        !isLiked() ? 
                        (
                            <>
                                <AiFillLike
                                    color={Colors.blueLight}
                                />
                                <label 
                                    className='like-and-comment-label'
                                    style={{ color: Colors.blueLight }}
                                >
                                    Like
                                </label>
                            </>
                        )
                        :
                        (
                            <>
                                <AiFillDislike
                                    color={Colors.blueLight}
                                />
                                <label 
                                    className='like-and-comment-label'
                                    style={{ color: Colors.blueLight }}
                                >
                                    Unlike
                                </label>
                            </>
                        )
                    }
                </div>

                <div className='like-and-comment-container'>
                    <FaComment
                        color={Colors.blueLight}
                    />
                    <label 
                        className='like-and-comment-label'
                        style={{ color: Colors.blueLight }}
                    >
                        Comment
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Post;