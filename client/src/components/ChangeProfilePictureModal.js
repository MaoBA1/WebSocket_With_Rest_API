import React, { useState } from 'react';
import '../utilities/profileSetting.css';
import Colors from '../utilities/Colors';
import { ref, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import { AiOutlineClose } from 'react-icons/ai';
import { socket } from '../socket.io';

function ChangeProfilePictureModal({ profileImage, setIsVisible, account }) {
    const [ isInProcess, setIsInProcess ] = useState(false);
    const [ processPrecent, setProcessPresent ] = useState(0);
    const [ pickedImage, setPickedImage ] = useState(null);

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        const imageRef = ref(storage, "profileImages/" + fileObj.name);
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
                    setPickedImage({downloadUrl, name: fileObj.name});
                    return socket.emit("change_profile_image", {account: account, newImageUrl: downloadUrl});
                })
            }
        )
        console.log('fileObj is', fileObj);
    };
    const cancelFileChange = () => {
        socket.emit("cancel_change_profile_image", { account: account })
        const imageRef = ref(storage, "profileImages/" + pickedImage.name);
        deleteObject(imageRef)
        .then(() => {
            setPickedImage(null);
        })
        .catch(error => {
            console.log(error.message);
        })
    }


    return (  
        <div className='change-profile-picture-modal-container'>
            <div className='change-profile-picture-modal-background'/>
            <div className='change-profile-picture-modal-body'>
                <div style={{
                    width:"100%",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"flex-end",
                    paddingRight:"10px"
                }}>
                    <AiOutlineClose
                        size={"20px"}
                        onClick={() => setIsVisible(false)}
                    />
                </div>
                { isInProcess &&
                    <div style={{
                        display:"flex",
                        flexDirection:"row",
                        width:"80%",
                        backgroundColor: Colors.blueBold,
                        height:"20px",
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
                }
                <img
                    src={profileImage}
                    style={{
                        width:"120px",
                        height:"120px",
                        border:`2px solid ${Colors.blueLight}`,
                        borderRadius:"20px"
                    }}
                />
                {
                    !isInProcess && !pickedImage &&
                    
                        <div style={{
                            width:"100%",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                        }}>
                            <input
                                type="file"
                                style={{
                                    width:"90%",
                                    height:"max-content",
                                    backgroundColor: Colors.blueBold,
                                    color:"#FFFFFF",
                                    fontFamily:"italic"
                                }}
                                onChange={handleFileChange}
                            />
                        </div>
                }
                {
                    pickedImage &&
                    <button onClick={cancelFileChange} style={{
                        borderRadius:"20px",
                        backgroundColor: Colors.red,
                        border:"2px solid #FFFFFF",
                        color:"#FFFFFF",
                        fontFamily:"italic",
                        fontSize:"15px"
                    }}>
                        Cancel
                    </button>
                
                }
            </div>
        </div>
    );
}

export default ChangeProfilePictureModal;