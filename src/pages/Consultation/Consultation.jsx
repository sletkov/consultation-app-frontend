import "./Consultation.css"
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { TiEdit } from "react-icons/ti";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Header } from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom';
import { type } from "@testing-library/user-event/dist/type";
import { Popup } from "../../components/UI/Popup/Popup";
import { Modal } from "../../components/UI/Modal/Modal";

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
    const [deleteModalActive, setDeleteModalActive] = useState(false)
    const [successUpdatePopupActive, setSuccessUpdatePopupActive] = useState(false)
    const [successSignupPopupActive, setSuccessSignupPopupActive] = useState(false)
    const [signedUp, setSignedUp] = useState([])
    const [draft, setDraft] = useState(consultation.draft)

    function SignedUp() {
        if (consultation.students) {
            let students = consultation.students
            return students.some(student => student.id == localStorage.getItem("userID"));
        }
        return false
    }

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
            draft : draft,
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
            setSuccessUpdatePopupActive(true)
            return response.json
        })

        if (updateResponse && updateResponse !== undefined){
            console.log("Success update consultation")
            // fetchConsultation()
        }
    }
    
    async function deleteConsultation() {
        var teacherID = localStorage.getItem("userID")
        let body = JSON.stringify({
            teacher_id: teacherID,
        })

        const deleteResponse = await fetch('http://localhost:8080/private/consultations/delete/' + consultation.id, {
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

        if (deleteResponse && deleteResponse !== undefined){
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
                <Popup active={successUpdatePopupActive} setActive={setSuccessUpdatePopupActive} className="success-update-popup">
                    <p>Консультация была успешно обновлена</p>
                    <IoMdClose className="close-icon" onClick={()=>setSuccessUpdatePopupActive(false)}/>
                </Popup>

                <Popup active={successSignupPopupActive} setActive={setSuccessSignupPopupActive} className="success-signup-popup">
                    <p>Вы успешно записались на консультацию</p>
                    <IoMdClose className="close-icon" onClick={()=>setSuccessSignupPopupActive(false)}/>
                </Popup>

                <Modal active={deleteModalActive} setActive={setDeleteModalActive} className="delete-modal">
                    <div>
                        <p>Вы действительно хотите удалить консультацию?</p>
                    </div>
                    <div className="delete-btns">
                        <button onClick={()=>setDeleteModalActive(false)} className="cancel-delete-btn">Отмена</button>
                        <button onClick={()=>deleteConsultation()} className="delete-cons-btn">Удалить</button>
                    </div>

                </Modal>
                <div className='consultation__header'>
                    <div className="consultation__header--title">
                        <h1>{consultation.title} ({consultation.type})</h1>
                        <p>{consultation.format}</p>
                    </div>
                    {
                        localStorage.getItem("userRole") == "teacher" && localStorage.getItem("userID") == consultation.teacher_id?
                        // <button onClick={()=>{deleteConsultation()}} className="delete-cons-btn">Удалить</button>
                        <button onClick={()=>setDeleteModalActive(true)} className="delete-cons-btn">Удалить</button>
                        :
                        <></>
                    }
                </div>
                
                <p>Преподаватель: {consultation.teacher_name}</p>

                <div className='consultation__date'>
                    <div className="consultation__date--header">
                        <h2>Дата и время проведения</h2>
                        {
                            localStorage.getItem("userRole") == "teacher" && localStorage.getItem("userID") == consultation.teacher_id?
                            <button onClick={()=> setEditDate(true)} className="edit-btn"><TiEdit className="edit-icon"/></button>
                            :
                            <></>
                        }
                    </div>

                    {
                        editDate?
                        <div className="edit-date__form">
                            <div className="edit-date__form-content">
                                <label className="date__container">
                                    Дата:
                                    <input type="date" value={consultation.date} onChange={(e)=>setConsultation({...consultation, date: e.target.value})}/>
                                </label>

                                <label className="time__container">
                                    Время:
                                    <input type="time" value={consultation.time} onChange={(e)=>setConsultation({...consultation, time: e.target.value})}/>
                                </label>
                            </div>

                            <div className="edit-btns">
                                <button onClick={()=>setEditDate(false)} className="cancel-edit-btn">Отмена</button>
                                <button onClick={()=>{
                                    updateConsultation()
                                    setEditDate(false)
                                }} className="update-btn">
                                    Сохранить
                                </button>
                            </div>
   
                        </div>
                        :
                        <div className="edit-date__form-content">
                            <div className="date__container">
                                <p>Дата:</p>
                                <p>{consultation.date}</p>
                            </div>

                            <div className="time__container">
                                <p>Время:</p>
                                <p>{consultation.time}</p>
                            </div>
                        </div>
                    }


                </div>
                
                {
                    consultation.format == "Очно"?
                    <div className='consultation__address'>
                        <div className='consultation__address--header'>
                            <h2>Место проведения </h2>
                            {
                                localStorage.getItem("userRole") == "teacher" && localStorage.getItem("userID") == consultation.teacher_id?
                                <button className="edit-btn" onClick={()=>setEditAddress(true)}><TiEdit className="edit-icon"/></button>
                                :
                                <></>
                            }
                        </div>

                        {
                            editAddress?
                            <div className="edit-address__form">
                                <div className="edit-address__form-content">
                                    <label className="address__container">
                                        Корпус:
                                        <input type="text" value={consultation.campus} onChange={(e)=>setConsultation({...consultation, campus: e.target.value})}/>
                                    </label>

                                    <label className="classroom__container">
                                        Аудитория:
                                        <input type="tеxt" value={consultation.classroom} onChange={(e)=>setConsultation({...consultation, classroom: e.target.value})}/>
                                    </label>
                                </div>

                                <div className="edit-btns">
                                    <button onClick={()=>setEditAddress(false)} className="cancel-edit-btn">Отмена</button>
                                    <button onClick={()=>{
                                        updateConsultation()
                                        setEditAddress(false)
                                    }} className="update-btn">
                                        Сохранить
                                    </button>
                                </div>

                            </div>
                            :
                            <div className="edit-address__form-content">
                                <div className="address__container">
                                    <p>Корпус:</p>
                                    <p>{consultation.campus}</p>
                                </div>

                                <div className="classroom__container">
                                    <p>Аудитория:</p>
                                    <p>{consultation.classroom}</p>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div className="consultation-link">
                        <div className="consultation-link--header">
                            <h2>Ссылка для подключения</h2>
                            {
                                localStorage.getItem("userRole") == "teacher" && localStorage.getItem("userID") == consultation.teacher_id?
                                <button className="edit-btn" onClick={()=>setEditLink(true)}><TiEdit className="edit-icon"/></button>
                                :
                                <></>
                            }
                        </div>

                        {
                            editLink?
                            <div className="edit-link__form">
                                <input type="text" value={consultation.link} onChange={(e)=>setConsultation({...consultation, link: e.target.value})}/>
                                <div className="edit-btns">
                                    <button onClick={()=>setEditLink(false)} className="cancel-edit-btn">Отмена</button>
                                    <button onClick={()=>{
                                    updateConsultation()
                                    setEditLink(false)
                                    }} className="update-btn">
                                        Сохранить
                                    </button>
                                </div>

                            </div>
                            :
                            <a href={consultation.link} target="_blank">{consultation.link}</a>
                        }
                    </div>
                }

                <div className='consultation__info'>
                    <div className="consultation__info--header">
                        <h2>Описание</h2>
                        {
                            localStorage.getItem("userRole") == "teacher" && localStorage.getItem("userID") == consultation.teacher_id?
                            <button className="edit-btn" onClick={()=>(setEditDescription(true))}><TiEdit className="edit-icon"/></button>
                            :
                            <></>
                        }
                    </div>

                    {
                        editDescription?
                        <div className="edit-info__form">
                            <input type="textarea" value={consultation.description} className="description-textarea" onChange={(e)=>setConsultation({...consultation, description: e.target.value})}/>

                            <div className="edit-btns">
                                <button onClick={()=>setEditDescription(false)} className="cancel-edit-btn">Отмена</button>
                                <button onClick={()=>{
                                updateConsultation()
                                setEditDescription(false)
                                }} className="update-btn">
                                    Сохранить
                                </button>
                            </div>
       
                        </div>
                        :
                        <p>{consultation.description}</p>
                    }
                </div>

                {
                    localStorage.getItem("userRole") == "teacher" && 
                    localStorage.getItem("userID") == consultation.teacher_id &&
                    consultation.draft?
                    <button className="public-cons-btn" onClick={()=> {
                        setDraft(false)
                        updateConsultation()
                        navigate("/consultations")
                    }}>Опубликовать</button>
                    :
                    <></>
                }

                {
                    localStorage.getItem("userRole") == "student" && !SignedUp()?
                    <button className="signup-cons-btn" onClick={()=> SignupOnConsultation()}>Записаться</button>
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