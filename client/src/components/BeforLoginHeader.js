import Colors from '../utilities/Colors';





const BeforLoginHeader = ({ title, subtitle }) => {
    return(
        <div className='header'
            style={{
                backgroundColor: Colors.blackBlue
            }}
        >
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <label style={{
                    color:"#FFFFFF",
                    fontFamily:"Bold",
                    fontSize:"35px",
                }}>
                    {title}
                </label>

                <label style={{
                    color:"#FFFFFF",
                    fontFamily:"Bold",
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