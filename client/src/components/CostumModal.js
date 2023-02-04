import React from 'react';


function CostumModal({ 
    backgroundColor,
    width,
    height
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
                opacity:"0.4",
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
                }}>

                </div>
            </div>
        </div>
    );
}

export default CostumModal;