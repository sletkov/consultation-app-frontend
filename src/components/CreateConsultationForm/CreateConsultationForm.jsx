import "./CreateConsultationForm.css"
import {Modal} from "../UI/Modal/Modal"
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

export const CreateConsultationForm = ({active, setActive}) => {
    const [consultation, setConsultation] = useState({})

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [format, setFormat] = useState("Очно")
    const [type, setType] = useState("Консультация")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [campus, setCampus] = useState("")
    const [classroom, setClassroom] = useState("")
    const [link, setLink] = useState("")
    const [limit, setLimit] = useState(10)

    // teacherID = 
    // async function CreateConsultation(){
    //     let body =JSON.stringify({
    //         title: title,
    //         description: description,
    //         format: format,
    //         type: type,
    //         // teacher_id: teacherID,
    //         date: date,
    //         campus: campus,
    //         classroom: classroom,
    //         students_limit: limit,
    //     })
    //     console.log(body)
    //     let createConsultationResponse = await axios.post("http://localhost:8080/private/consultations", {
    //         body,
    //     }).then((response) => {
    //         if (response.status == 200) {
    //             console.log("Create consultation OK")
    //         }
    //     })
    // }

    
    async function CreateConsultation() {
        let teacherID = localStorage.getItem("userID")
        let teacherName = localStorage.getItem("userName")
        let body = JSON.stringify({
            title: title,
            description: description,
            format: format,
            type: type,
            teacher_id: teacherID,
            date: date,
            time: time,
            campus: campus,
            classroom: classroom,
            link: link,
            limit: limit,
            teacher_name: teacherName,
        })

        console.log(body)
        const createResponse = await fetch('http://localhost:8080/private/consultations', {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
              },
              body: body,
            credentials: 'include'
        }).then((response)=>{
            setActive(false)
            return response.json
        })

        if (createResponse && createResponse !== undefined){
           console.log("Success create consultation")
        }
        
    }

    return (
        <Modal active={active} setActive={setActive} className="create-consultation-form">
            <div className="create-consultation-form__header">
                <h2>Создать Консультацию</h2>
                <button onClick={() => setActive(false)} className="close-btn"><IoMdClose/></button>
            </div>
            <form className="create-consultation-form" onSubmit={(e) => e.preventDefault()}>
                <label className="form-label">
                    Название дисциплины
                    <input value={title} onChange={(e)=> {
                        setTitle(e.target.value)
                        console.log(title)
                    }} type="text"  placeholder="Введите название дисциплины"/>
                </label>

                <label className="form-label">
                    Описание консультации
                    <textarea onChange={(e)=> {
                        setDescription(e.target.value)
                        console.log(description)
                    }} name="" id="" cols="30" rows="10"></textarea>
                </label>


                <label className="form-label">
                    Тип консультации
                    <select value={type} onChange={(e)=> {
                        setType(e.target.value)
                    }} name="" id="">
                        <option value="Консультация">Консультация</option>
                        <option value="Пересдача">Пересдача</option>
                        <option value="Отработка">Отработка</option>
                    </select>
                </label>

                <label className="form-label">
                    Формат
                    <select value={format} onChange={(e)=> {
                        setFormat(e.target.value)
                    }} name="" id="">
                        <option value="Очно">Очно</option>
                        <option value="Онлайн">Онлайн</option>
                    </select>
                </label>

                <div className="date-inputs">
                    <label className="form-label">
                        Дата Консультации
                        <input value={date} onChange={(e)=> {
                            setDate(e.target.value)
                            console.log(date)
                        }} type="date"/>
                    </label>

                    <label className="form-label">
                        Время консультации
                        <input value={time} onChange={(e)=> {
                            setTime(e.target.value)
                            console.log(time)
                        }} type="time"/>
                    </label>
                </div>
                

                {
                    format == "Очно"?
                    <div className="irl-format-inputs">
                        <label className="form-label">
                            Корпус
                            <select value={campus} onChange={(e)=> {
                                setCampus(e.target.value)
                            }} name="" id="">
                                <option value="БС">БС</option>
                                <option value="ПК">ПК</option>
                                <option value="Прянишникова">Прянишникова</option>
                                <option value="Автозаводская">Автозаводская</option>
                            </select>
                        </label>

                        <label className="form-label">
                            Аудитория
                            <input value={classroom} onChange={(e)=> {
                                setClassroom(e.target.value)
                                console.log(classroom)
                            }} type="text" />
                        </label>
                    </div>
                    :
                    <></>
                }


                {
                    format== "Онлайн"?
                    <label className="form-label">
                        Ссылка для подключения
                        <input value={link} onChange={(e)=> {
                            setLink(e.target.value)
                            console.log(link)
                        }} type="text" />
                    </label>
                  :
                  <></>  
                }


                <label className="form-label">
                    Лимит на запись
                    <input value={limit} onChange={(e)=> {
                        setLimit(Number(e.target.value))
                        console.log(limit)
                    }} type="number" />
                </label>

                <button className="create-cons-btn" type='submit' onClick={() => CreateConsultation()}>Создать</button>
            </form>
           
        </Modal>
    );
}