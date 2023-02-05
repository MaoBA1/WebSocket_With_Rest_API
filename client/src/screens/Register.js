import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
import '../utilities/register.css';
import { ref, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import { socket } from '../socket.io';
import { useNavigate, } from 'react-router-dom';


// components
import BeforLoginHeader from '../components/BeforLoginHeader';
import CostumModal from '../components/CostumModal';

function Register() {
    const navigate = useNavigate();
    const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    const [ pickedImage, setPickedImage ] = useState(null);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ fname, setFname ] = useState("");
    const [ lname, setLname ] = useState("");
    const [ isInProcess, setIsInProcess ] = useState(false);
    const [ processPrecent, setProcessPresent ] = useState(0);
    const [ showModal, setShowModal ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState("");
    const [ modalButtons, setModalButtons ] = useState([]);
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
        socket.on("create_account", (response) => {
            if(!response.status) {
                console.log(response);
                setShowModal(true);
                setModalMessage({message: response.message, fontColor:Colors.red});
                setModalButtons([{text: "OK", onClick: () => setShowModal(false)}])
            } else {
                console.log(response);
                let fname = response?.account?.fname;
                let email = response?.account?.email;
                setShowModal(true);
                setModalMessage({
                    message: `Hi ${fname}, Your account\n
                    has been created successfully!\n
                    Account verification link sent to\n
                    ${email}`, 
                    fontColor:Colors.blueLight
                });
                setModalButtons([{text: "OK", onClick: () => {
                        navigate('/')
                        setShowModal(false);
                    }
                }])
            }
        })
    },[email, fname, navigate]);

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

    const signUp = () => {
        const checkEmail = email.includes('@') && email.includes('.com') && email.indexOf('@') < email.indexOf('.com');
        const checkPassword = password.length >= 6;
        const checkName = fname.length >= 2 || lname.length >= 2;
        if(checkEmail && checkPassword && checkName) {
            socket.emit("create_account", {
                email: email,
                password: password,
                fname: fname,
                lname: lname,
                profileImage: pickedImage ? pickedImage.downloadUrl : defaultImage 
            });
        }
        
    }
    return ( 
        <div className='main-div-container' style={{
            backgroundColor: Colors.creamyWhite,
            height: windowSize.height
        }}>
            {showModal && <CostumModal
                width={"300px"}
                height={"200px"}
                backgroundColor={Colors.blackBlue}
                message={modalMessage}
                buttons={modalButtons}
            />}
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
                                required
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                style={{ 
                                    fontFamily:"Regular",
                                    border: `2px solid ${Colors.blueLight}`,
                                    backgroundColor:Colors.grey
                                }}
                                placeholder="Email Address..."
                            />
                        </div>
                        

                        <div className='input-container-row'>
                            <div className='inner-input-container-row'>
                                <label style={ labelStyle }>
                                    First Name
                                </label>
                                <input
                                    required
                                    value={fname}
                                    onChange={event => setFname(event.target.value)}
                                    style={{ 
                                        fontFamily:"Regular",
                                        width:"90%",
                                        border: `2px solid ${Colors.blueLight}`,
                                        backgroundColor:Colors.grey
                                    }}
                                    placeholder="First Name..."
                                />
                            </div>

                            <div className='inner-input-container-row'>
                                <label style={ labelStyle }>
                                    Last Name
                                </label>
                                <input
                                    required
                                    value={lname}
                                    onChange={event => setLname(event.target.value)}
                                    style={{ 
                                        fontFamily:"Regular",
                                        width:"90%",
                                        border: `2px solid ${Colors.blueLight}`,
                                        backgroundColor:Colors.grey
                                    }}
                                    placeholder="Last Name..."
                                />
                            </div>
                        </div>

                        <div className='input-container-column'>
                            <label style={ labelStyle }>
                                Password
                            </label>
                            <input
                                required
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                style={{ 
                                    fontFamily:"Regular",
                                    width:"60%",
                                    border: `2px solid ${Colors.blueLight}`,
                                    backgroundColor:Colors.grey
                                }}
                                type={"password"}
                                placeholder="Password..."
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
                                alt='profile_image'
                                src={!pickedImage ? defaultImage : pickedImage.downloadUrl}
                                style={{
                                    width:"120px",
                                    height:"120px",
                                    borderRadius:"50%",
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
                       <button onClick={signUp} style={{
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