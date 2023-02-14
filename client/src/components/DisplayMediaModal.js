import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';


function DisplayMediaModal({ media, setMedia }) {
    return (  
        <div className='display-modal-cover'>
            <AiOutlineClose
                color='#FFFFFF'
                style={{
                    position:"absolute",
                    right:"20",
                    top:"20"
                }}
                size={"25px"}
                onClick={() => setMedia(null)}
            />
            {
                media.type === "image"  &&
                <img
                    src={media.downloadUrl}
                    style={{
                        objectFit:"cover"
                    }}
                />
            }
        </div>
    );
}

export default DisplayMediaModal;