import Colors from '../utilities/Colors';
import '../utilities/dashboard.css';
import { BiMenu } from 'react-icons/bi';



const AfterLoginHeader = ({ title, profileImage, menuCollapsed, setMenuCollapsed, moveToCurrentUserProfile }) => {
    return(
        <div className='header'
            style={{
                backgroundColor: Colors.blackBlue,
                display:"flex",
                flexDirection:"column"
            }}
        >
            <div className='header-title'>
                <div style={{
                    flex:0.5,
                    paddingLeft: "15px"
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
                        fontFamily:"Bold",
                        fontSize:"25px"
                    }}>
                        {title}
                    </label>
                </div>
            </div>

            <div className='header-footer'>
                <div className='search-line-container'>
                    <input
                        type={"text"}
                        className="search-line"
                        style={{
                            backgroundColor: Colors.grey,
                            fontFamily:"Regular",
                            fontStyle:"italic"
                        }}
                        placeholder="Search..."
                    />
                </div>

                <div className='profile-image-container'>
                    <img
                        alt='profileImage'
                        src={profileImage}
                        style={{
                            width:"40px",
                            height:"40px",
                            borderRadius:"50%",
                            border:`2px solid ${Colors.grey}`
                        }}
                        onClick={moveToCurrentUserProfile}
                    />
                </div>
            </div>
            
        </div>
    )
}


export default AfterLoginHeader;