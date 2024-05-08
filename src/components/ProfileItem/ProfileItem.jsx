import "./ProfileItem.css"
import { FaUserCircle,  FaClipboardList,} from "react-icons/fa"
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export const ProfileItem = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);

    function Logout() {
        Cookies.remove("consultation-app")
        localStorage.removeItem("userID")
        localStorage.removeItem("userRole")
        navigate("/login")
    }

    return(
        <div className="profile-item">
            <div className="profile-link" onClick={()=>setActive(true)}>
                <FaUserCircle className="avatar"/>
                {/* <div className="user-info">
                    <p className='fullname'>{localStorage.getItem("userID")}</p>
                    <p className='role'>{localStorage.getItem("userRole") == "teacher"? "Преподаватель" : "Студент"}</p>
                </div> */}
            </div>

            <div className={active? "profile-item__accordeon active" : "profile-item__accordeon"}>

                <div className="popup">
                    <div className="popup__content">
                        <a href="/profile" className="popup__link"><FaUserCircle/>Профиль</a>                    
                        <a href="/my-consultations" className="popup__link"><FaClipboardList/>Мои консультации</a>
                        <button className="popup__btn" onClick={() => {Logout()}}><RiLogoutBoxFill/>Выйти</button>  
                    </div>
                    <button onClick={()=>setActive(false)} className="popup__close-btn"><IoMdClose/></button>
                </div>
            </div>
        </div>
    );
}