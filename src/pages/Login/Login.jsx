import './Login.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail]  = useState("")
    const [password, setPassword]  = useState("")

    async function Login() {
        console.log("LOGIN")
        let body = JSON.stringify({
            email: email,
            password: password,
        })
        // const loginResponse = await fetch('http://localhost:8080/login', {
        //     method: "POST",
        //     mode: "no-cors",
        //     headers: {
        //         'Content-Type': 'application/json'
        //       },
        //     body: body,
        //     credentials: 'include'
        // }).then((response)=>{
        //     console.log(response.status)
        //     if (response.status == 200) {
        //         console.log("OK")
        //     }
        //     return response.json();
        // })

        var response = await axios.post("http://localhost:8080/login", body, {withCredentials:true})
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200 && response.data) {
            localStorage.setItem("userID", response.data.id)
            localStorage.setItem("userRole", response.data.role)
            localStorage.setItem("userName", response.data.full_name)
        }
        navigate("/consultations")
    }

    return(
        <div className="login-page">
            <h1 className="page-heading">Вход</h1>
            <form action="" className='login-form' onSubmit={()=> navigate("/consultations")}>
                <label className='form-label'>
                    Логин
                    <input type="text" className="form-input" placeholder='Введите логин'  onChange={(e) => setEmail(e.target.value)}/>
                </label>

                <label className='form-label login'>
                    Пароль
                    <input type="password" className="form-input" placeholder='Введите пароль' onChange={(e) => {
                        setPassword(e.target.value)
                        }}
                        />
                </label>

                <button className='login-btn' type="submit" onClick={() => Login()}>Войти</button>
                <a href='/sign-up' className='signup-link'>Зарегистрироваться</a>
             </form>
        </div>
    )
}