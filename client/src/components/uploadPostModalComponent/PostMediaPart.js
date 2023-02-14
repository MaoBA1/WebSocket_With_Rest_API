import React, { useState } from 'react';
import { ref, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import { AiOutlineClose } from 'react-icons/ai';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Colors from '../../utilities/Colors';







const PostMediaPart = ({ componentIndex, mediaArray, setMediaArray, setMediaToDisplay }) => {
    const [ isInProcess, setIsInProcess ] = useState(false);
    const [ processPrecent, setProcessPresent ] = useState(0);
    const [ mediaType, setMediaType ] = useState("image");

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
                    setMediaArray((mediaList) => [...mediaList, {downloadUrl, name: fileObj.name, type: mediaType}]);
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
                        <div onClick={() => setMediaToDisplay(item)} key={index} className='media-array-item'>
                            <div
                                className="x-icon"
                                onClick={() => deleteImageFromStorage(item)}
                            >
                                <AiOutlineClose
                                    color='#FFFFFF'
                                    size={"12px"}
                                />
                            </div>
                            {
                                mediaType === "image" &&
                                <img
                                    src={item.downloadUrl}
                                    className="media-array-media"
                                />
                            }

                            {
                                mediaType === "video" &&
                                <video
                                    src={item.downloadUrl}
                                    className="media-array-media"
                                />
                            }
                        </div>
                    )
                }
            </div>

            {
                !isInProcess ?
                (
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                    }}>
                        {
                            mediaArray.length < 9
                            &&
                            <>
                                <input
                                    type="file"
                                    accept={`${mediaType}/*`}
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
                                <div style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    justifyContent:"space-around",
                                }}>
                                    <label style={{
                                        fontFamily:"italic",
                                        color:"grey",
                                        margin:"5px"
                                    }}>
                                        Media Type:
                                    </label>
                                    <div
                                        style={{
                                            backgroundColor: Colors.blueMedium,
                                            borderRadius:"20px",
                                            height:"40px",
                                            width:"150px",
                                            display:"flex",
                                            flexDirection:"row",
                                            alignItems:"center",
                                            justifyContent:"space-around"
                                        }}
                                    >
                                        <FaArrowLeft
                                            color={"#FFFFFF"}
                                            onClick={() => setMediaType(mediaType === "image" ? "video" : "image")}
                                        />
                                        <label style={{
                                            fontFamily:"italic",
                                            color: Colors.blueLight,
                                            margin:"5px"
                                        }}>
                                            {mediaType}
                                        </label>
                                        <FaArrowRight
                                            color={"#FFFFFF"}
                                            onClick={() => setMediaType(mediaType === "image" ? "video" : "image")}
                                        />
                                    </div>
                                </div>
                            </>
                        }
                    </div>
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


export default PostMediaPart;