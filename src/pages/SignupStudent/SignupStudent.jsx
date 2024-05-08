import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignupStudent.css'

export function SignupStudent() {

    const [fullName, setFullName] = useState("")
    const [email, setEmail]  = useState("")
    const [password, setPassword]  = useState("")

    const navigate = useNavigate();

    async function Signup() {
        let body = JSON.stringify({
            full_name: fullName,
            role: "student",
            email: email,
            password: password,
        })
        console.log(body)
        const createResponse = await fetch('http://localhost:8080/sign-up', {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
              },
              body: body
        }).then((response)=>{
            return response.json
        })

        if (createResponse && createResponse !== undefined){
           console.log("Success sign-up")
        }
    }

    return (
      <div className="Signup">
        <h1 className="page-heading">Регистрация студента</h1>

        <form className="signup-form" onSubmit={()=> navigate("/login")}>
            <label className='form-label'>
                ФИО
                <input type="text" placeholder="Введите ФИО" className='form-input' onChange={(e) => setFullName(e.target.value)}/>
            </label>

            <label className='form-label'>
                Факультет
                <input type="text" placeholder="Введите факультет" className='form-input' />
            </label>

            <label className='form-label'>
                Номер группы
                <input type="text" placeholder="Введите номер группы" className='form-input' />
            </label>

            <label className='form-label'>
                Email
                <input type="email" placeholder="Введите email" className='form-input' onChange={(e) => setEmail(e.target.value)}/>
            </label>

            <label className='form-label'>
                Пароль
                <input type="password" placeholder="Введите пароль" className='form-input' onChange={(e) => setPassword(e.target.value)}/>
            </label>

            <label className='form-label'>
                Повторите пароль
                <input type="password" placeholder="Повторите пароль" className='form-input' />
            </label>

            <button className='signup-btn' onClick={() => Signup()}>Зарегистрироваться</button>
        </form>
      </div>
);
}