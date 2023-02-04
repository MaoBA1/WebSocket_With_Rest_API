import React from 'react';


function CostumModal({ 
    backgroundColor,
    width,
    height,
    message,
    buttons
}) {
    return ( 
        <div style={{
            width:"100%",
            height:"100%",
            position:"absolute"
        }}>
            <div style={{
                width:"100%",
                height:"100%",
                backgroundColor:"gray",
                opacity:"0.5",
                position:"absolute",
                zIndex:"0"
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
                    backgroundColor: backgroundColor,
                    width,
                    height,
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:"20px"
                }}>
                    <div>
                        <label style={{
                            fontFamily:"Bold",
                            color: message.fontColor
                        }}>
                            {message.message}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CostumModal;