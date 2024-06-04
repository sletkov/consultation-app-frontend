import "./Profile.css"
import { IoMdClose } from "react-icons/io";
import { Modal } from "../../components/UI/Modal/Modal";
import { Header } from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from 'axios'
import { TiEdit } from "react-icons/ti";

export const Profile = () => {
    const [profile, setProfile] = useState({})
    const [newPasswordModalActive, setNewPasswordModalActive] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
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
            <Modal active={newPasswordModalActive} setActive={setNewPasswordModalActive}>
                <div className="update-pass__header">
                    <h2>Обновление пароля</h2>
                    <IoMdClose onClick={() => setNewPasswordModalActive(false)} className="close-icon"/>
                </div>

                <form className="update-pass-form">
                    <label className="update-pass-form__label">
                        Введите старый пароль
                        <input type="password" className="update-pass-form__input"/>
                    </label>

                    <label className="update-pass-form__label">
                        Введите новый пароль
                        <input type="password" className="update-pass-form__input"/>
                    </label>
                    <button className="update-pass-btn">Обновить</button>
                </form>
            </Modal>
            <Header/>
            <div className="profile__container">
                <div className="profile__container--header">
                    <h1>Мой профиль</h1>
                    <button onClick={()=>setNewPasswordModalActive(true)} className="set-new-pass-btn">Установить новый пароль</button>
                </div>
                <p>ФИО: {profile.full_name}</p>
                <p>Роль: {profile.role=="teacher"? "Преподаватель":"Cтудент"} <button className="edit-btn"></button></p>
                <div className="profile__email">
                    <div className="profile__email__header">
                        {editEmail?
                            <label className="edit-email-label">
                                Email
                                <input type="email"/>
                            </label>
                            :
                            <p>Email: {profile.email} </p>
                        }
                        <button className="edit-btn" onClick={()=>setEditEmail(true)}><TiEdit className="edit-icon"/></button>
                    </div>


                    {
                        editEmail?
                        <div className="edit-btns">
                            <button onClick={()=>setEditEmail(false)} className="cancel-edit-btn">Отмена</button>
                            <button className="update-btn">
                                Сохранить
                            </button>
                        </div>
                        :
                        <></>
                    }

                </div>

            </div>
        </div>
    );
}