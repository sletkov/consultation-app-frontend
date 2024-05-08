import './Consultations.css'
import { Header } from "../../components/Header/Header";
import { ConsultationCard } from "../../components/ConsultationCard/ConsultationCard";
import { CreateConsultationForm } from '../../components/CreateConsultationForm/CreateConsultationForm';
import { useEffect, useState } from 'react';
import axios from 'axios'


export function Consultations() {
    const [consultations, setConsultations] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [userID, setUserID] = useState("")
    const [consultationID, setConsultationID] = useState("")
    const [userRole, setUserRole] = useState("")
    const [searchConsultation, setSearchConsultation] = useState({
        title: "",
        campus: "",
        format: "",
    })

    const [page, setPage] = useState(1)
    const [consOnPage, setConsOnPage] = useState(50)

    async function fetchConsultations(page, consOnPage) {

        var response = await axios.get("http://localhost:8080/private/consultations", {
            // params:{
            //     page: page,
            //     limit: consOnPage,
            // },
            withCredentials:true, 
        })
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200 && response.data) {
            setConsultations(response.data)
        }
        console.log(consultations)
    }
    
    useEffect(() => {
        fetchConsultations()
        setUserRole(localStorage.getItem("userRole"))
        setUserID(localStorage.getItem("userID"))
        console.log("useEffect")
    },[])

    async function SignupOnConsultation() {
        let body = JSON.stringify({
            user_id: userID,
            consultation_id: consultationID,
        })
        const createResponse = await fetch('http://localhost:8080/private/consultations/sign-up', {
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
           console.log("Success sign-up")
        }
    }

    //Может быть поиск и фильтры в отдельный компонент?
    function searchConsultations(title) {
        var searchedCons  = consultations.filter(item => item.title.includes(title))
        setConsultations(searchedCons)
        if (title.length == 0) {
            fetchConsultations()
        }
    }

    function filterConsultationsByCampus(campus) {
        var searchedCons  = consultations.filter(item => item.campus == campus)
        setConsultations(searchedCons)
        if (campus == "Все корпуса") {
            fetchConsultations()
        }
    }

    
    function filterConsultationsByType(type) {
        var searchedCons  = consultations.filter(item => item.type == type)
        setConsultations(searchedCons)
        if (type == "Любой тип") {
            fetchConsultations()
        }
    }

    function filterConsultationsByFormat(format) {
        var searchedCons  = consultations.filter(item => item.format == format)
        setConsultations(searchedCons)
        if (format == "Любой формат") {
            fetchConsultations()
        }
    }

    function filterConsultationsByDate(date) {
        var searchedCons  = consultations.filter(item => item.date == date)
        setConsultations(searchedCons)
        if (date == 0) {
            fetchConsultations()
        }
    }

    return(
        <div className="consulations">
            <Header/>

            <div className='consultations__header'>
                <h1>Консультации</h1>
                {
                    userRole === "teacher"
                    ? 
                    <button onClick={() => {setModalActive(true)}} className='create-consultation-btn'>Создать консультацию</button>
                    :
                    <></>
                }
            </div>
          
            <label className='consultations__search'>
                <input  className='consultations__search-input' type='search' placeholder="Поиск" onChange={(e) => searchConsultations(e.target.value)}/>
                {/* Возможно ненужная кнопка */}
                <button type='reset'className='consultations__search-btn' onClick={() => searchConsultations()}>Найти</button>
            </label>

            <div className='consultations__filters'>
                <select className="campus-select" name="" id="" onChange={(e) => filterConsultationsByCampus(e.target.value)}>
                    <option value="Все корпуса">Все корпуса</option>
                    <option value="БС">БС</option>
                    <option value="Прянишникова">Прянишникова</option>
                    <option value="ПК">ПК</option>
                    <option value="Автозаводская">Автозаводская</option>
                </select>

                <select className="type-select" name="" id="" onChange={(e) => filterConsultationsByType(e.target.value)}>
                    <option value="Любой тип">Любой тип</option>
                    <option value="Консультация">Консультация</option>
                    <option value="Пересдача">Пересдача</option>
                    <option value="Отработка">Отработка</option>
                </select>

                <select className="format-select" name="" id="" onChange={(e) => filterConsultationsByFormat(e.target.value)}>
                    <option value="Любой формат">Любой формат</option>
                    <option value="Очно">Очно</option>
                    <option value="Онлайн">Онлайн</option>
                </select>

                <input className="date-input" type="date" />

                <select className="count-select" name="" id="" value={consOnPage} onChange={(e) => (
                    setConsOnPage(Number(e.target.value),
                    fetchConsultations(page, consOnPage)
                ))}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
           
            <CreateConsultationForm active={modalActive} setActive={setModalActive}/>

            {
            consultations.length != 0 ?
            <div className="consultations__container">
                {consultations.map((cons) => {
                    return <ConsultationCard key={cons.id} consultation = {cons}/>
                })}
            </div>
            :
            <div>Консультаций пока нет...</div>
            }

        </div>
    );
}