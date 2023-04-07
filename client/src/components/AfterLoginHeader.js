import Colors from '../utilities/Colors';
import '../utilities/dashboard.css';
import { BiMenu } from 'react-icons/bi';



const AfterLoginHeader = ({ 
    profileImage,
    menuCollapsed,
    setMenuCollapsed,
    currentTab,
    notificationNumber,
    moveToProfileSettings
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
                    borderRadius:"5px",
                    position:"relative"
                }}>
                    {
                        notificationNumber > 0 &&
                        <div style={{
                            width:"18px",
                            height:"18px",
                            borderRadius:"50%",
                            backgroundColor: "red",
                            border:"1px solid #FFFFFFFF",
                            position:"absolute",
                            right: -10,
                            top: -10,
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center"
                        }}>
                            <label
                                style={{
                                    fontFamily:"italic",
                                    color:"#FFFFFF",
                                    fontSize:"14px"
                                }}
                            >
                                {notificationNumber}
                            </label>
                        </div>
                    }
                    <BiMenu
                        color='#FFFFFF'
                        size={"30px"}
                        onClick={() => setMenuCollapsed(!menuCollapsed)}
                    />
                </div>

                <div style={{
                    width:"90%",
                    alignItems:"center",
                    display:"flex",
                    flexDirection:"column"
                }}>
                    <label style={{
                        color:"#FFFFFF",
                        fontFamily:"italic",
                        fontSize:"16px",
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
                                    objectFit:"cover",
                                    width:"50px",
                                    height:"50px",
                                    borderRadius:"50%",
                                    border:`2px solid #FFFFFF`,
                                    boxShadow:"#000000 0px 5px 15px"
                                }}
                                onClick={moveToProfileSettings}
                            />
                        )
                        :
                        (
                            <div
                                style={{
                                    width:"50px",
                                    height:"50px",
                                    borderRadius:"50%",
                                    boxShadow:"#000000 0px 5px 15px"
                                }} 
                                className='messages-container-loading'
                            />
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}


export default AfterLoginHeader;