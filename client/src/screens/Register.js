import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
import '../utilities/register.css';
import { ref, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import { socket } from '../socket.io';

// components
import BeforLoginHeader from '../components/BeforLoginHeader';


function Register() {
    const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    const [ pickedImage, setPickedImage ] = useState(null);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ fname, setFname ] = useState("");
    const [ lname, setLname ] = useState("");
    const [ isInProcess, setIsInProcess ] = useState(false);
    const [ processPrecent, setProcessPresent ] = useState(0);
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const labelStyle = {
        fontFamily:"Bold",
        fontSize:"20px",
        fontStyle:"italic",
        color:Colors.blueMedium
    }
    useEffect(() => {
        const handelResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handelResize);
        
    },[]);

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
                })
            }
        )
        console.log('fileObj is', fileObj);
    };
    const deleteImageFromStorage = () => {
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
        <div className='main-div-container' style={{
            backgroundColor: Colors.creamyWhite,
            height: windowSize.height
        }}>
            <BeforLoginHeader
                title={"Posts & Chats"}
                subtitle={"Register"}
            />
            <div className='main-div'>
                <div className='first-half'>
                    <form>
                        <div className='input-container-column'>
                            <label style={ labelStyle }>
                                Email
                            </label>
                            <input 
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                style={{ 
                                    fontFamily:"Regular",
                                    border: `2px solid ${Colors.blueLight}`
                                }}
                                placeholder="Type Your Email Address..."
                            />
                        </div>
                        

                        <div className='input-container-row'>
                            <div className='inner-input-container-row'>
                                <label style={ labelStyle }>
                                    First Name
                                </label>
                                <input
                                    value={fname}
                                    onChange={event => setFname(event.target.value)}
                                    style={{ 
                                        fontFamily:"Regular",
                                        width:"90%",
                                        border: `2px solid ${Colors.blueLight}`
                                    }}
                                    placeholder="Type Your First Name..."
                                />
                            </div>

                            <div className='inner-input-container-row'>
                                <label style={ labelStyle }>
                                    Last Name
                                </label>
                                <input
                                    value={lname}
                                    onChange={event => setLname(event.target.value)}
                                    style={{ 
                                        fontFamily:"Regular",
                                        width:"90%",
                                        border: `2px solid ${Colors.blueLight}`
                                    }}
                                    placeholder="Type Your Last Name..."
                                />
                            </div>
                        </div>

                        <div className='input-container-column'>
                            <label style={ labelStyle }>
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                style={{ 
                                    fontFamily:"Regular",
                                    width:"80%",
                                    border: `2px solid ${Colors.blueLight}`
                                }}
                                type={"password"}
                                placeholder="Type Your Password..."
                            />
                        </div>
                    </form>
                    <div className='image-part-container'>
                            { isInProcess &&
                                <div style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    width:"50%",
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
                            }
                            <img
                                src={!pickedImage ? defaultImage : pickedImage.downloadUrl}
                                style={{
                                    width:"120px",
                                    height:"120px",
                                    borderRadius:"50px",
                                    border: `5px solid ${Colors.blueLight}`
                                }}
                            />

                            {  !isInProcess && !pickedImage
                                &&
                                <input
                                    className='file-input'
                                    type="file"
                                    style={{
                                        backgroundColor: Colors.blueBold,
                                        fontFamily:"Regular"
                                    }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            }
                            {
                                pickedImage &&
                                <button style={{
                                    backgroundColor: Colors.red,
                                    color: "#FFFFFF",
                                    border:"1px solid #FFFFFF",
                                    fontFamily:"Bold",
                                    fontSize:"15px",
                                    height:"30px",
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    justifyContent:"center"
                                }} onClick={deleteImageFromStorage}>
                                    Cancel
                                </button>
                            }
                    </div>
                </div>

                <div className='second-half'>
                       <button style={{
                            backgroundColor:Colors.blueBold,
                            border:`3px solid ${Colors.blueLight}`,
                            fontFamily:"Bold"
                       }}>
                            Sign-Up
                       </button>         
                </div>
            </div>
        </div>
    );
}

export default Register;