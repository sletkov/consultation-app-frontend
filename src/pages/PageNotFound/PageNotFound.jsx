import './PageNotFound.css'

import logoText from  '../../assets/mospolytech-logo-white.svg' 
import logoCircle from  '../../assets/mospolytech-logo-white.png' 
export const PageNotFound = () => {
    return(
        <div className="page-not-found">
            <div className="page-not-found__container">
                <div className="page-not-found__logos">
                    <img src={logoCircle} alt="logo" className="page-not-found__logo-circle"/>
                    <img src={logoText} alt="text logo" className="page-not-found__logo-text"/>
                </div>

                <h1 className='page-not-found__heading'>Ошибка 404: Страница не найдена</h1>
            </div>
        </div>
    )
}