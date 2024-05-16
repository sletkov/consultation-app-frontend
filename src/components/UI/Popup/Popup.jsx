import "./Popup.css"

export const Popup = ({active, setActive, children, className}) => {
    return(
        <div className={active ? `${className} popup active`: `${className} popup`} onClick={() => setActive(false)}>
            <div className={active ? "popup active": "popup__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}