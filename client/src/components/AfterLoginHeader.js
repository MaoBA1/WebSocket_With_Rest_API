import Colors from '../utilities/Colors';
import '../utilities/dashboard.css';
import { BiMenu } from 'react-icons/bi';



const AfterLoginHeader = ({ 
    title,
    profileImage,
    menuCollapsed,
    setMenuCollapsed,
    moveToCurrentUserProfile,
    currentTab
}) => {
    return(
        <div className='header'
            style={{
                backgroundColor: Colors.blackBlue,
                display:"flex",
                flexDirection:"column"
            }}
        >
            <div className='header-footer'>
                <div>
                    <label style={{
                        color:"#FFFFFF",
                        fontFamily:"italic",
                        fontSize:"20px",
                    }}>
                        Posts & Chats
                    </label>
                </div>
            </div>

            <div className='header-title'>
                <div style={{
                    border:"0.5px solid grey",
                    boxShadow:"#000000 0px 5px 15px",
                    borderRadius:"5px"
                }}>
                    <BiMenu
                        color='#FFFFFF'
                        size={"30px"}
                        onClick={() => setMenuCollapsed(!menuCollapsed)}
                    />
                </div>

                <div>
                    <label style={{
                        color:"#FFFFFF",
                        fontFamily:"italic",
                        fontSize:"18px",
                    }}>
                        {currentTab}
                    </label>
                </div>

                <div className='profile-image-container'>
                    {
                        profileImage ?
                        (
                            <img
                                alt='profileImage'
                                src={profileImage}
                                style={{
                                    width:"40px",
                                    height:"40px",
                                    borderRadius:"50%",
                                    border:`2px solid #FFFFFF`,
                                    boxShadow:"#000000 0px 5px 15px"
                                }}
                                onClick={moveToCurrentUserProfile}
                            />
                        )
                        :
                        (
                            <div className='image-place-holder'/>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}


export default AfterLoginHeader;