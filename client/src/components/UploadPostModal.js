import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';



// components
import PostContentPart from './uploadPostModalComponent/PostContentPart';
import PostMediaPart from './uploadPostModalComponent/PostMediaPart';
import Colors from '../utilities/Colors';


function UploadPostModal({ account, setIsVisible, setMediaToDisplay }) {
    const [ mediaArray, setMediaArray ] = useState([]);
    const [ componentIndex, setComponentIndex ] = useState(0);
    const [ postContent, setPostContent ] = useState("");
    const [ isInProcess, setIsInProcess ] = useState(false);

    const components = [
        <PostContentPart 
            componentIndex={componentIndex}
            postContent={postContent}
            setPostContent={setPostContent}
        />,
        <PostMediaPart 
            componentIndex={componentIndex} 
            mediaArray={mediaArray}
            setMediaArray={setMediaArray}
            setMediaToDisplay={setMediaToDisplay}
            isInProcess={isInProcess}
            setIsInProcess={setIsInProcess}
        />
    ]
    

    return (  
        <div className='upload-post-modal-container'>
            <div className='upload-post-modal-background'/>
            <div className='upload-post-modal-body'>
                <div 
                    className='close-modal'
                    onClick={() => setIsVisible(false)}
                >
                    <AiOutlineClose
                        color='#FFFFFF'
                        size={"18px"}
                    />
                </div>
                <div className='state-replacement-container'>
                    <div className='arrow-left-container'>
                        <div style={{
                            backgroundColor:"#000000",
                            width:"50px",
                            height:"50px",
                            borderTopRightRadius:"10px",
                            borderBottomRightRadius:"10px",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center"
                        }} onClick={() => {
                            if((componentIndex % components.length) !== 0) {
                                setComponentIndex(componentIndex + 1)
                            }
                        }}>
                            <FaArrowLeft
                                color={(componentIndex % components.length) !== 0 ? "#FFFFFF" : "grey"}
                            />
                        </div>
                    </div>

                    <div className='content-container'>
                        {components[componentIndex % components.length]}
                    </div>

                    <div className='arrow-right-container'>
                    <div style={{
                            backgroundColor:"#000000",
                            width:"50px",
                            height:"50px",
                            borderTopLeftRadius:"10px",
                            borderBottomLeftRadius:"10px",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center"
                        }} onClick={() => {
                            if((componentIndex % components.length) < components.length -1) {
                                setComponentIndex(componentIndex + 1)
                            }
                        }}>
                            <FaArrowRight
                                color={(componentIndex % components.length) < components.length -1 ? "#FFFFFF" : "grey"}
                            />
                        </div>
                    </div>
                </div>
                <div className='indicator-container'>
                        {
                            components.map((item,index) =>
                                <div key={index} className={index === componentIndex % components.length ? "active indicator" : "indicator"}/>
                            )
                        }
                </div>
                {
                    !isInProcess &&
                    <button style={{
                        backgroundColor: Colors.blueBold,
                        border:`2px solid ${Colors.blueLight}`,
                        fontFamily:"italic",
                        color: postContent.length === 0 ? "grey" : "#FFFFFF",
                        opacity: postContent.length === 0 ? "0.7" : "1"
                    }}>
                        Post
                    </button>
                }
            </div>
        </div>
    );
}

export default UploadPostModal;