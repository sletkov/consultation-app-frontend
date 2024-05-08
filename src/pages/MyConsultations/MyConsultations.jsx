import "./MyConsultations.css"
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ConsultationCard } from "../../components/ConsultationCard/ConsultationCard";

export const MyConsultations = () => {
    const [consultations, setConsultations] = useState([])

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


    useEffect(()=>{
        fetchConsultations()
    },[])

    return(
        <div className="my-consultations-page">
            <Header/>
            <h1 className="my-consultations-page__header">Мои консультации</h1>

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