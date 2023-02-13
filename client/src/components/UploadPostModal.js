import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function UploadPostModal({ account }) {
    const [ componentIndex, setComponentIndex ] = useState(0);

    const components = [
        <div className={componentIndex % 2 === 0 ? "slide active" : "slide" } style={{
            
        }}>
            
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
                                <div className='indicator'/>
                            )
                        }
                </div>
            </div>
        </div>
    );
}

export default UploadPostModal;