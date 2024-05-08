import "./Consultation.css"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Header } from '../../components/Header/Header'

export const Consultation = () => {
    const {id} = useParams()

    const [consultation, setConsultation] = useState({})

    async function fetchConsultation() {
        var response = await axios.get("http://localhost:8080/private/consultations/" + id, {withCredentials:true})
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200) {
            setConsultation(response.data)
        }
        console.log(consultation)
    }


    useEffect(()=>{
        fetchConsultation()
    },[])

    return(
        <div className='consultation-page'>
            <Header/>
            <div className='consultation__container'>
                <div className='consultation__header'>
                    <h1>{consultation.title} ({consultation.type})</h1>
                    <p>{consultation.format}</p>
                    {/* <button>Редактировать</button> */}
                </div>
                
                <p>Преподаватель: {consultation.teacher_name}</p>

                <div className='consultation__date'>
                    <h2>Дата и время проведения</h2>
                    <p>Дата: {consultation.date}</p>
                    <p>Время: {consultation.time}</p>
                </div>

                <div className='consultation__address'>
                    <h2>Место проведения</h2>
                    <p>Корпус: {consultation.campus}</p>
                    <p>Аудитория: {consultation.classroom}</p>
                </div>

                <div className='consultation__info'>
                    <h2>Описание</h2>
                    <p>{consultation.description}</p>
                </div>

                {
                    localStorage.getItem("userRole") == "student"?
                    <button className="signup-cons-btn">Записаться</button>
                    :
                    <></>
                }
            </div> 


        </div>
    );
}