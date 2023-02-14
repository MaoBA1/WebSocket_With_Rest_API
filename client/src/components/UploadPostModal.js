import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Colors from '../utilities/Colors';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ref, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import { AiOutlineClose } from 'react-icons/ai';


const PostContentPart = ({ componentIndex }) => {
    return(
        <div 
            className={componentIndex % 2 === 0 ? "slide active" : "slide" } 
            style={{
                
            }}
        >
            <label style={{
                fontFamily:"italic",
                fontSize:"20px",
                color: Colors.blueLight,
                margin:"10px",
                textAlign:"center"
            }}>
                What do you want to share ?
            </label>
            <textarea
                type={"text"}
                style={{
                    width:"90%",
                    height:"50%",
                    backgroundColor:Colors.grey,
                    border:`2px solid ${Colors.blueLight}`,
                    fontFamily:"italic",
                    borderRadius:"20px",
                    padding:"10px"                    
                }}
                multiple
                placeholder={"This is the place to share..."}
            />
        </div>
    )
}

const PostMediaPart = ({ componentIndex, mediaArray, setMediaArray }) => {
    const [ isInProcess, setIsInProcess ] = useState(false);
    const [ processPrecent, setProcessPresent ] = useState(0);


    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        const imageRef = ref(storage, "postsMedia/" + fileObj.name);
        setIsInProcess(true);
        const uploadTask = uploadBytesResumable(imageRef, fileObj);
        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProcessPresent(progress.toFixed());
            },
            (error) => {
                console.log(error.message);
            }, 
            () => {
                setProcessPresent(0);
                setIsInProcess(false);
                return getDownloadURL(uploadTask.snapshot.ref)
                .then(downloadUrl => {
                    setMediaArray((mediaList) => [...mediaList, {downloadUrl, name: fileObj.name}]);
                })
            }
        )
        console.log('fileObj is', fileObj);
    };
    const deleteImageFromStorage = (imageToRemove) => {
        const imageRef = ref(storage, "postsMedia/" + imageToRemove.name);
        deleteObject(imageRef)
        .then(() => {
            let media = mediaArray.filter(m => m.name !== imageToRemove.name);
            setMediaArray(media)
        })
        .catch(error => {
            console.log(error.message);
        })
    }


    return(
        <div className={componentIndex % 2 === 1 ? "slide active" : "slide" }>
            <label style={{
                fontFamily:"italic",
                color: Colors.blueLight,
                textAlign:"center",
                fontSize:"20px",
                margin:"10px"
            }}>
                Would you like to share some media in this post ?
            </label>
            
            <div className='upload-post-media-container'>
                {
                    mediaArray.map((item, index) => 
                        <div key={index} className='media-array-item'>
                            <div
                                className="x-icon"
                                onClick={() => deleteImageFromStorage(item)}
                            >
                                <AiOutlineClose
                                    color='#FFFFFF'
                                    size={"12px"}
                                />
                            </div>
                            <img
                                src={item.downloadUrl}
                                className="media-array-media"
                            />
                        </div>
                    )
                }
            </div>

            {
                !isInProcess ?
                (
                    <input
                        type="file"
                        accept="image/*,video/*"
                        style={{
                            border:`1px solid ${Colors.blueLight}`,
                            height:"50px",
                            fontFamily:"italic",
                            backgroundColor: Colors.blueBold,
                            color:"#FFFFFF",
                            margin:"10px"
                        }}
                        onChange={handleFileChange}
                    />
                )
                :
                (
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        width:"90%",
                        backgroundColor: Colors.blueBold,
                        height:"20px",
                        margin:"20px",
                        borderRadius:"20px",
                        border:"2px solid #FFFFFF"
                    }}>
                        <div
                            style={{
                                borderRadius:"20px",
                                width:`${processPrecent}%`,
                                height:"100%",
                                backgroundColor: Colors.blueLight
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}

function UploadPostModal({ account, setIsVisible }) {
    const [ mediaArray, setMediaArray ] = useState([]);
    const [ componentIndex, setComponentIndex ] = useState(0);
    const components = [
        <PostContentPart 
            componentIndex={componentIndex}
        />,
        <PostMediaPart 
            componentIndex={componentIndex} 
            mediaArray={mediaArray}
            setMediaArray={setMediaArray}
        />
    ]
    

    return (  
        <div className='upload-post-modal-container'>
            <div className='upload-post-modal-background'/>
            <div className='upload-post-modal-body'>
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
                        }} onClick={() => setComponentIndex(componentIndex + 1)}>
                            <FaArrowLeft
                                color="#FFFFFF"
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
                        }} onClick={() => setComponentIndex(componentIndex + 1)}>
                            <FaArrowRight
                                color="#FFFFFF"
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
                <div>
                    <button style={{
                        borderRadius:"20px",
                        backgroundColor: Colors.red,
                        border:"2px solid #FFFFFF",
                        color:"#FFFFFF",
                        fontFamily:"italic",
                        fontSize:"15px"
                    }} onClick={() => setIsVisible(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadPostModal;