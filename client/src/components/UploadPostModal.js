import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Colors from '../utilities/Colors';

function UploadPostModal({ account, setIsVisible }) {
    const [ componentIndex, setComponentIndex ] = useState(0);

    const components = [
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
        </div>,
        <div className={componentIndex % 2 === 1 ? "slide active" : "slide" } style={{
            
        }}>
            
        </div>
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
                        }}>
                            <FaArrowLeft
                                onClick={() => setComponentIndex(componentIndex + 1)}
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
                        }}>
                            <FaArrowRight
                                onClick={() => setComponentIndex(componentIndex + 1)}
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