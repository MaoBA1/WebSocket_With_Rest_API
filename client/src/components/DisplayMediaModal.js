import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';


function DisplayMediaModal({ media, setMedia }) {
    console.log(media);
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
                media.mediaType === "image"  ?
                (
                    <img
                        alt="post-video"
                        src={media.downloadUrl}
                        style={{
                            objectFit:"contain",
                            height:"80%",
                            width:"80%"
                        }}
                    />
                )
                :
                (
                    <video
                        alt="post-video"
                        src={media.downloadUrl}
                        style={{
                            objectFit:"contain",
                            height:"80%",
                            width:"80%"
                        }}
                        controls
                        
                    />
                )
            }
            
        </div>
    );
}

export default DisplayMediaModal;