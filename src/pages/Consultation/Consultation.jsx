import "./Consultation.css"
import React, { useEffect, useState } from 'react'
import { TiEdit } from "react-icons/ti";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Header } from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom';
import { type } from "@testing-library/user-event/dist/type";

export const Consultation = () => {
    let navigate = useNavigate();
    const {id} = useParams()

    const [consultation, setConsultation] = useState({})
    // const [updateConsultation, setUpdateConsultation] = useState(consultation)
    const [students, setStudents] = useState([])
    const [editDate, setEditDate] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    const [editLink, setEditLink] = useState(false)
    const [editDescription, setEditDescription] = useState(false)

    async function fetchConsultation() {
        let response = await axios.get("http://localhost:8080/private/consultations/" + id, {withCredentials:true})
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200) {
            setConsultation(response.data)
        }
        console.log(consultation)
    }

    async function fetchStudents() {
        let endpoint = `http://localhost:8080/private/consultations/${id}/students`
        let response = await axios.get(endpoint, {withCredentials:true})
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200) {
            setStudents(response.data)
        }
        console.log(students)
    }

    async function updateConsultation() {
        var teacherID = localStorage.getItem("userID")
        let body = JSON.stringify({
            teacher_id: teacherID,
            title: consultation.title,
            description: consultation.description,
            format: consultation.format,
            type: consultation.type,
            date: consultation.date,
            time: consultation.time,
            campus: consultation.campus,
            classroom: consultation.classroom,
            link: consultation.link,
            limit: consultation.limit,
        })

        console.log(body)
        const updateResponse = await fetch('http://localhost:8080/private/consultations/update/' + id, {
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

        if (updateResponse && updateResponse !== undefined){
           console.log("Success update consultation")
           fetchConsultation()
        }
    }

    
    async function deleteConsultation() {
        var teacherID = localStorage.getItem("userID")
        let body = JSON.stringify({
            teacher_id: teacherID,
        })

        console.log(body)
        const createResponse = await fetch('http://localhost:8080/private/consultations/delete/'+consultation.id, {
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

        if (createResponse && createResponse !== undefined){
           console.log("Success delete consultation")
           navigate("/consultations")
        }
    }

    function SignedUp() {
        if (consultation.students) {
            let students = consultation.students
            return students.some(student => student.id == localStorage.getItem("userID"));
        }
        return false
    }


    useEffect(()=>{
        fetchConsultation()
        if (localStorage.getItem("userRole") == "teacher") {
            fetchStudents()
        }
    },[])

    return(
        <div className='consultation-page'>
            <Header/>
            <div className='consultation__container'>
                <div className='consultation__header'>
                    <h1>{consultation.title} ({consultation.type})</h1>
                    <p>{consultation.format}</p>
                    {
                        localStorage.getItem("userRole") == "teacher" && localStorage.getItem("userID") == consultation.teacher_id?
                        <button onClick={()=>{deleteConsultation()}} className="delete-cons-btn">Удалить</button>
                        :
                        <></>
                    }
                </div>
                
                <p>Преподаватель: {consultation.teacher_name}</p>

                <div className='consultation__date'>
                    <div className="consultation__date--header">
                        <h2>Дата и время проведения</h2>
                        <button onClick={()=> setEditDate(true)} className="edit-btn"><TiEdit className="edit-icon"/></button>
                    </div>

                    {
                        editDate?
                        <div className="edit-date__form">
                            <div className="edit-date__form-content">
                                <label>
                                    Дата:
                                    <input type="date" value={consultation.date} onChange={(e)=>setConsultation({...consultation, date: e.target.value})}/>
                                </label>

                                <label>
                                    Время:
                                    <input type="time" value={consultation.time} onChange={(e)=>setConsultation({...consultation, time: e.target.value})}/>
                                </label>
                            </div>

                            <button onClick={()=>{
                                updateConsultation()
                                setEditDate(false)
                            }}>
                                Сохранить
                            </button>
                        </div>
                        :
                        <div>
                            <p>Дата: {consultation.date}</p>
                            <p>Время: {consultation.time}</p>
                        </div>
                    }


                </div>
                
                {
                    consultation.format == "Очно"?
                    <div className='consultation__address'>
                        <div className='consultation__address--header'>
                            <h2>Место проведения </h2>
                            <button className="edit-btn" onClick={()=>setEditAddress(true)}><TiEdit className="edit-icon"/></button>
                        </div>

                        {
                            editAddress?
                            <div className="edit-address__form">
                                <div className="edit-address__form-content">
                                    <label>
                                        Корпус:
                                        <input type="text" value={consultation.campus} onChange={(e)=>setConsultation({...consultation, campus: e.target.value})}/>
                                    </label>

                                    <label>
                                        Аудитория:
                                        <input type="tеxt" value={consultation.classroom} onChange={(e)=>setConsultation({...consultation, classroom: e.target.value})}/>
                                    </label>
                                </div>

                                <button onClick={()=>{
                                    updateConsultation()
                                    setEditAddress(false)
                                }}>
                                    Сохранить
                                </button>
                            </div>
                            :
                            <div>
                                <p>Корпус: {consultation.campus}</p>
                                <p>Аудитория: {consultation.classroom}</p>
                            </div>
                        }
                    </div>
                    :
                    <div className="consultation-link">
                        <div className="consultation-link--header">
                            <h2>Ссылка для подключения</h2>
                            <button className="edit-btn" onClick={()=>setEditLink(true)}><TiEdit className="edit-icon"/></button>
                        </div>

                        {
                            editLink?
                            <div className="edit-link__form">
                                <input type="text" value={consultation.link} onChange={(e)=>setConsultation({...consultation, link: e.target.value})}/>
                                <button onClick={()=>{
                                    updateConsultation()
                                    setEditLink(false)
                                }}>
                                    Сохранить
                                </button>
                            </div>
                            :
                            <a href={consultation.link} target="_blank">{consultation.link}</a>
                        }
                    </div>
                }

                <div className='consultation__info'>
                    <div className="consultation__info--header">
                        <h2>Описание</h2>
                        <button className="edit-btn" onClick={()=>(setEditDescription(true))}><TiEdit className="edit-icon"/></button>
                    </div>

                    {
                        editDescription?
                        <div className="edit-info__form">
                            <input type="textarea" value={consultation.description} className="description-textarea" onChange={(e)=>setConsultation({...consultation, description: e.target.value})}/>
                            <button onClick={()=>{
                                updateConsultation()
                                setEditDescription(false)
                            }}>
                                Сохранить
                            </button>
                        </div>
                        :
                        <p>{consultation.description}</p>
                    }
                </div>

                {
                    localStorage.getItem("userRole") == "student" && !SignedUp()?
                    <button className="signup-cons-btn">Записаться</button>
                    :
                    <></>
                }
            </div>
            {
                localStorage.getItem("userRole") == "teacher" && localStorage.getItem("userID") == consultation.teacher_id?
                <div className="students-list">
                    <h2>Список студентов</h2>
                    <div>
                        {
                           students?
                            students.map(( student, idx)=>{
                                return <div key={idx}>{idx + 1}. {student.full_name} (201-321)</div>
                            })
                            :
                            <div>
                                Пока не записался ни один студент...
                            </div>
                        }
                    </div>
                </div>
                :
                <></>
            }

        </div>
    );
}