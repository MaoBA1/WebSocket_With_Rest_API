import React from 'react';
import Colors from '../utilities/Colors';

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
                    justifyContent:"space-around",
                    borderRadius:"20px",
                    padding:"10px",
                    boxShadow:"#000000 0px 5px 15px"
                }}>
                    <div>
                        <label style={{
                            fontFamily:"Bold",
                            color: message.fontColor,
                            textAlign:"center"
                        }}>
                            {message.message}
                        </label>
                    </div>

                    <div style={{
                        width:"100%",
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-around",
                    }}>
                        {
                            buttons.map((item, index) => 
                                <button key={index} style={{
                                    backgroundColor: "#FFFFFF",
                                    width:"80px",
                                    height:"30px",
                                    color: Colors.blueLight,
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    fontFamily:"Bold",
                                    fontSize:"15px",
                                    border:`2px solid ${Colors.blueLight}`
                                }} onClick={item.onClick}>
                                    {item.text}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CostumModal;