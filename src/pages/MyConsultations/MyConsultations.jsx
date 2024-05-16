import "./MyConsultations.css"
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ConsultationCard } from "../../components/ConsultationCard/ConsultationCard";
import { CreateConsultationForm } from "../../components/CreateConsultationForm/CreateConsultationForm";
import { MdDrafts } from "react-icons/md";

export const MyConsultations = () => {
    const [consultations, setConsultations] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [showDrafts, setShowDrafts] = useState(false)

    async function fetchConsultations() {
        var id = localStorage.getItem("userID")
        var userRole = localStorage.getItem("userRole")
        var endpoint

        if (userRole == "student") {
            endpoint = "http://localhost:8080/private/consultations/student/" + id
        } else if (userRole == "teacher") {
            endpoint = "http://localhost:8080/private/consultations/teacher/" + id
        }
        var response = await axios.get(endpoint, {withCredentials:true})
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200) {
            setConsultations(response.data)
        }
        console.log(consultations)
    }

    function ShowDrafts() {
        let drafts = consultations.filter(cons => cons.draft == true)
        setConsultations(drafts) 
    }


    useEffect(()=>{
        fetchConsultations()
    },[])

    return(
        <div className="my-consultations-page">
            <Header/>

            <div className='my-consultations__header'>
                <h1>Мои консультации</h1>
                {
                    localStorage.getItem("userRole") == "teacher"
                    ? 
                    <button onClick={() => {setModalActive(true)}} className="create-consultation-btn">Создать консультацию</button>
                    :
                    <></>
                }

            </div>
            {
                localStorage.getItem("userRole") == "teacher"
                ?
                <div className="my-consultations__btns">
                    <button className={!showDrafts ? "active-btn": "my-consultations__active-btn"} onClick={()=>{
                        fetchConsultations()
                        setShowDrafts(false)
                    }}>Активные</button>

                    <button className={showDrafts ? "active-btn": "my-consultations__draft-btn"} onClick={()=>{
                        ShowDrafts()
                        setShowDrafts(true)
                    }}>Черновики</button>
                </div>
                :
                <></>
            }
           

            <CreateConsultationForm active={modalActive} setActive={setModalActive}/>

            <div className="consultations__container">
                {
                    consultations.map((cons)=> {
                       return <ConsultationCard key={cons.id} consultation={cons}/>
                    })
                }
            </div>
        </div>
    );
}