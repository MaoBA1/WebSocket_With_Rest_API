import React, { useState, useEffect } from 'react';
import Colors from '../utilities/Colors';
import { RiCloseFill } from 'react-icons/ri';



function ForgetPassword({ setVisible, socket }) {
    const [ email, setEmail ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ success, setSuccess ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState("");

    const sendEmailPasswordLink = () => {
        setErrorMessage("");
        if(email === "") {
            setErrorMessage("Email Required!");
            return;
        }
        socket.emit("forget_password", {email: email});
    }

    useEffect(() => {
        socket.on("forget_password", (response) => {
            if(!response.status) {
                setErrorMessage(response.message);
                return
            }
            console.log(response);
            setSuccess(true);
            setSuccessMessage(response.message)
            setTimeout(() => {
                setSuccess(false);
                setSuccessMessage("");
                setVisible(false);
            }, 3000)
        });
    },[setVisible]);


    return (
        <div style={{
            width:"100%",
            height:"100%",
            position:"absolute",
        }}>
            <div style={{
                width:"100%",
                height:"100%",
                backgroundColor:"gray",
                opacity:"0.5",
                position:"absolute",
                zIndex:"0",
            }}/>
            <div style={{
                width:"100%",
                height:"100%",
                position:"absolute",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <div style={{
                    backgroundColor: "#FFFFFF",
                    width:"70%",
                    height:"300px",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"space-around",
                    borderRadius:"20px",
                    padding:"30px",
                    boxShadow:"#000000 0px 5px 15px",
                    zIndex:"2",
                }}>
                    {
                        success ?
                        (
                            <label style={{
                                fontFamily:"Bold",
                                color: Colors.blueMedium,
                                fontSize:"18px",
                                textAlign:"center"
                            }}>
                               {successMessage}
                            </label>
                        )
                        :
                        (
                            <>
                                <div style={{
                                    width:"100%",
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"flex-end"
                                }}>
                                    <RiCloseFill
                                        color={Colors.blueMedium}
                                        size="30px"
                                        onClick={() => setVisible(false)}
                                    />
                                </div>
                                <label style={{
                                    fontFamily:"Bold",
                                    color: Colors.blueLight,
                                    fontSize:"20px",
                                    textAlign:"center"
                                }}>
                                    What is your email Address ?
                                </label>
                                {errorMessage !== "" && <label style={{
                                    fontFamily:"Regular",
                                    color: Colors.red,
                                    fontSize:"18px",
                                    textAlign:"center"
                                }}>
                                    {errorMessage}
                                </label>}
                                <form>
                                    <input 
                                        required
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        style={{ 
                                            fontFamily:"Regular",
                                            border: `2px solid ${Colors.blueLight}`,
                                            backgroundColor:Colors.grey,
                                        }}
                                        placeholder="Email Address..."
                                    />
                                </form>
                                <button onClick={sendEmailPasswordLink} style={{
                                    backgroundColor:Colors.blueBold,
                                    border:`3px solid ${Colors.blueLight}`,
                                    fontFamily:"Bold",
                                    fontSize:"12px",
                                    padding:"10px",
                                    width:"max-content",
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    justifyContent:"center"
                                }}>
                                    Send reset password link
                                </button>   
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;