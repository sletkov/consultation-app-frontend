import './Schedules.css'
import { Header } from '../../components/Header/Header';
import { useState } from 'react';

export const Schedules = () => {
    const [schedules, setSchedules] = useState([]) 
    const [group, setGroup] = useState("") 

    return(
        <div className='schedules'>
            <Header/>
            <div className='schedules__container'>
                <h1>Расписания</h1>

                <form action="" className='schedules__form'>
                    <input value={group} onChange={(e) => setGroup(e.target.value)} className="schedules__search" type="search" placeholder='Введите номер группы'/>
                    <button className="schedules__search-btn">Найти</button>
                </form>

                <div className='schedules-box'>
                    {
                        
                        schedules.length != 0 ?
                        <div/>
                        :
                        <div>Расписаний пока нет...</div>
                    }
                </div>

            </div>
        </div>
    );
}