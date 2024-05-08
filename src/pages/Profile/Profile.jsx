import "./Profile.css"
import { Header } from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from 'axios'

export const Profile = () => {
    const [profile, setProfile] = useState({})
    var id = localStorage.getItem("userID")

    async function fetchProfile() {
        var response = await axios.get("http://localhost:8080/private/users/" + id, {withCredentials:true})
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200) {
            setProfile(response.data)
        }
    }


    useEffect(()=>{
        fetchProfile()
    },[])

    return(
        <div className="profile">
            <Header/>
            <div className="profile__container">
                <h1>Мой профиль</h1>
                {/* <button>Редактировать</button> */}
                <p>ФИО: {profile.full_name}</p>
                <p>Роль: {profile.role=="teacher"? "Преподаватель":"Cтудент"}</p>
                <p>Email: {profile.email}</p>
            </div>
        </div>
    );
}