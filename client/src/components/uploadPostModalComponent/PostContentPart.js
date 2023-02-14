import React from 'react'
import Colors from '../../utilities/Colors';






const PostContentPart = ({ componentIndex }) => {
    return(
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
        </div>
    )
}

export default PostContentPart;