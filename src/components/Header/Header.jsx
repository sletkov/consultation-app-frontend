import './Header.css'
import logo from  '../../assets/mospolytech-logo-white.svg' 
import { ProfileItem } from '../ProfileItem/ProfileItem.jsx'


export function Header() {
    return(
        <header className="header">
            <ul className='navigation-list'>
                <img src={logo} alt="Logo" />

                <li className='navigation-item'>
                    <a href="/schedules" className='navigation-link'>Расписания</a>
                </li>
                <li className='navigation-item'>
                    <a href="/consultations" className='navigation-link'>Консультации</a>
                </li>
                <li className='navigation-item profile-link'>
                    {/* <a href="/profile" className='navigation-link'>Личный кабинет</a> */}
                    <ProfileItem/>
                </li>
            </ul>
        </header>
    )
}