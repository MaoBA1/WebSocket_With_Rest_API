import Colors from '../utilities/Colors';
import { IoMdArrowRoundBack } from 'react-icons/io';




const BeforLoginHeader = ({ title, subtitle, backFunction }) => {
    return(
        <div className='header'
            style={{
                backgroundColor: Colors.blackBlue,
                display:"flex",
                flexDirection:"row"
            }}
        >
            { backFunction && <div style={{
                display:"flex",
                flexDirection:"column",
                position:"absolute",
                left:"0",
                top:"0",
                height:"80px",
                width:"50px",
                alignItems:"center",
                justifyContent:"center",
            }}>
                <IoMdArrowRoundBack
                    color='#FFFFFF'
                    size={"25px"}
                    onClick={backFunction}
                />
            </div>}
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <label style={{
                    color:"#FFFFFF",
                    fontFamily:"italic",
                    fontSize:"40px",
                }}>
                    {title}
                </label>

                <label style={{
                    color:"#FFFFFF",
                    fontFamily:"italic",
                    fontSize:"25px",
                    fontStyle:"italic"
                }}>
                    {subtitle}
                </label>
            </div>
        </div>
    )
}


export default BeforLoginHeader;