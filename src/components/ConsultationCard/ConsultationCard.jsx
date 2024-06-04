import './ConsultationCard.css'
import { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';


export function ConsultationCard({consultation, setSuccessSignupPopupActive}) {
    let navigate = useNavigate();

    const [userID, setUserID] = useState("")
    const [userRole, setUserRole] = useState("")
    const [signedUp, setSignedUp] = useState([])

    function SignedUp() {
        if (consultation.students) {
            let students = consultation.students
            return students.some(student => student.id == localStorage.getItem("userID"));
        }
        return false
    }
    

    async function SignupOnConsultation() {
        let body = JSON.stringify({
            student_id: localStorage.getItem("userID"),
            consultation_id: consultation.id,
        })
        const createResponse = await fetch('http://localhost:8080/private/consultations/signup', {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
                },
            body: body,
            credentials: 'include'
        }).then((response)=>{
            return response.json
        })

        if (createResponse && createResponse != undefined){
            console.log("Success sign-up on consultation")
            setSuccessSignupPopupActive(true)
            setSignedUp([...signedUp, consultation.id])
        }
    }

    function getCardClass(type){
        switch (type) {
            case "Консультация":
                return "consultation"
            case "Отработка":
                return "practicing"
            case "Пересдача":
                return "retake"
        }
    }

    useEffect(() => {
        setUserRole(localStorage.getItem("userRole"))
    },[])
    return(
        // onClick={() => navigate("consultations/" + consultation.id)}
        <Link to={"../consultations/" + consultation.id} consultation={consultation} className={"consultation__card " + getCardClass(consultation.type) }>
            <div className='consultation-card__header'>
                <h2>{consultation.title}</h2>
                <p>{consultation.format}</p>
            </div>
            
            <div className='consultation-card__content'>
                <p>{consultation.type}</p>
                <p>Преподаватель: {consultation.teacher_name}</p>
                <p>Дата: {consultation.date}</p>
                <p>Время: {consultation.time}</p>
                {
                    consultation.format == "Очно"?
                    <div className='irl-format-data'>
                        <p>Корпус: {consultation.campus}</p>
                        <p>Аудитория: {consultation.classroom}</p>
                    </div>

                    :
                    <></>
                }

                <p>Кол-во записей: {consultation.students_count}/{consultation.limit}</p>
            </div>
            {
                userRole == "student" && !SignedUp()
                ?
                <button id='signup-on-cons-btn' onClick={(e) => {
                    e.preventDefault()
                    SignupOnConsultation()
                }}>Записаться</button>
                :
                // <p className='already-signedup'>Вы уже записались</p>
                <></>
            }
        </Link>
    )
}