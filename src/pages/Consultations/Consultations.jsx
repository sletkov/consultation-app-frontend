import './Consultations.css'
import { IoMdClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io"
import { IoIosArrowBack} from "react-icons/io"
import { Header } from "../../components/Header/Header";
import { ConsultationCard } from "../../components/ConsultationCard/ConsultationCard";
import { CreateConsultationForm } from '../../components/CreateConsultationForm/CreateConsultationForm';
import { Popup } from "../../components/UI/Popup/Popup";
import { useEffect, useState } from 'react';
import axios from 'axios'


export function Consultations() {
    const [consultations, setConsultations] = useState([])
    const [searchedCons, setSearchedCons] = useState(consultations)
    const [modalActive, setModalActive] = useState(false)
    const [userID, setUserID] = useState("")
    const [consultationID, setConsultationID] = useState("")
    const [userRole, setUserRole] = useState("")
    const [successCreatePopupActive, setSuccessCreatePopupActive] = useState(false)
    const [successSignupPopupActive, setSuccessSignupPopupActive] = useState(false)
    const [searchQuery, setSearchQuery] = useState({
        title: "",
        campus: "",
        type: "",
        format: "",
        date: ""
    })

    const [page, setPage] = useState(1)
    const [consOnPage, setConsOnPage] = useState(2)
    const [totalPages, setTotalPages] = useState(searchedCons.length / consOnPage)
    // const [totalPages, setTotalPages] = useState(100)

    async function fetchConsultations() {
        let response = await axios.get("http://localhost:8080/private/consultations", {
            withCredentials:true, 
        })
        
        console.log(response.data)
        console.log(response.status)
        if (response.status == 200 && response.data) {
            setConsultations(response.data)
            setSearchedCons(response.data)
        }
    }
 

    
    useEffect(() => {
        fetchConsultations()
        setUserRole(localStorage.getItem("userRole"))
        setUserID(localStorage.getItem("userID"))
    },[])

    useEffect(() => {
        filterAndSearch()
    },[searchQuery])

    // useEffect(() => {
    //     setTotalPages(Math.ceil(searchedCons.length / consOnPage))
    //     // setTotalPages(100)
    // },[searchedCons, consOnPage])

    // useEffect(() => {
    //     console.log(page)
    //     console.log(consOnPage)

    //     setSearchedCons(searchedCons.slice(page * consOnPage, page * consOnPage + consOnPage ))
    // },[page])



    function filterAndSearch() {
        let searchedAndFilteredCons = [...consultations]
        if (searchQuery.title.length != 0) {
            searchedAndFilteredCons = consultations.filter(item => item.title.toLowerCase().trim().includes(searchQuery.title.toLowerCase().trim()))
        }

        if (searchQuery.campus != "Все корпуса" && searchQuery.campus != "") {
            searchedAndFilteredCons = searchedAndFilteredCons.filter(item => item.campus == searchQuery.campus)
        }

        
        if (searchQuery.type != "Любой тип" && searchQuery.type != "") {
            searchedAndFilteredCons = searchedAndFilteredCons.filter(item => item.type == searchQuery.type)
        }

        
        if (searchQuery.format != "Любой формат" && searchQuery.format != "") {
            searchedAndFilteredCons = searchedAndFilteredCons.filter(item => item.format == searchQuery.format)
        }

        
        if (searchQuery.date != 0) {
            searchedAndFilteredCons = searchedAndFilteredCons.filter(item => item.date == searchQuery.date)
        }

        setSearchedCons(searchedAndFilteredCons)
    }

    return(
        <div className="consulations">
            <Header/>

            <Popup active={successCreatePopupActive} setActive={setSuccessCreatePopupActive} className="success-create-popup">
                    <p>Вы успешно создали консультацию</p>
                    <IoMdClose className="close-icon" onClick={()=>setSuccessCreatePopupActive(false)}/>
            </Popup>

            <Popup active={successSignupPopupActive} setActive={setSuccessSignupPopupActive} className="success-signup-popup">
                    <p>Вы успешно записались на консультацию</p>
                    <IoMdClose className="close-icon" onClick={()=>setSuccessSignupPopupActive(false)}/>
            </Popup>
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
                <input  className='consultations__search-input' type='search' placeholder="Поиск" onKeyDownCapture={(e) => {
                    setSearchQuery({...searchQuery, title: e.target.value})
                }}/>
                <button type='reset'className='consultations__search-btn'>Найти</button>
            </label>

            <div className='consultations__filters'>
                <select className="campus-select" name="" id="" onChange={(e) => {
                    setSearchQuery({...searchQuery, campus: e.target.value})
                    }}>
                    <option value="Все корпуса">Все корпуса</option>
                    <option value="БС">БС</option>
                    <option value="Прянишникова">Прянишникова</option>
                    <option value="ПК">ПК</option>
                    <option value="Автозаводская">Автозаводская</option>
                </select>

                <select className="type-select" name="" id="" onChange={(e) => {
                    setSearchQuery({...searchQuery, type: e.target.value})
                    }}>
                    <option value="Любой тип">Любой тип</option>
                    <option value="Консультация">Консультация</option>
                    <option value="Пересдача">Пересдача</option>
                    <option value="Отработка">Отработка</option>
                </select>

                <select className="format-select" name="" id="" onChange={(e) => {
                    setSearchQuery({...searchQuery, format: e.target.value})
                    }}>
                    <option value="Любой формат">Любой формат</option>
                    <option value="Очно">Очно</option>
                    <option value="Онлайн">Онлайн</option>
                </select>

                <input className="date-input" type="date" onChange={(e) => {
                    setSearchQuery({...searchQuery, date: e.target.value})
                }} />

                <select className="count-select" name="" id="" value={consOnPage} onChange={(e) => (
                    setConsOnPage(Number(e.target.value),
                    fetchConsultations(page, consOnPage)
                ))}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

            </div>
           
           {
            totalPages > 1 
            ?

            <div className='pagination'>
                <button disabled={page == 1} onClick={()=>setPage(page -1)} className='previous-page-btn'><IoIosArrowBack className='arrow-back'/></button>
                <div className='page-links'>
                    {
                        totalPages > 10 ?
                        <div className='pagination-slice'>
                            <p key={1} onClick={() => {
                                setPage(1)
                            }} className={page == 1 ? "page-link--active" : "page-link"}>{1}</p>
                            <p>...</p>
                        </div>
                        :
                        <></>
                    }
                    
                    {
                        [...Array(totalPages)].map((el, idx) => {
                            if (totalPages > 10) {
                                if ( idx + 1 != 1 && idx + 1 != 100 && idx <= page + 4 && idx >= page - 4) {
                                    return <p key={idx} onClick={() => {
                                        setPage(idx + 1)
                                        console.log(idx)
                                    }} className={page == idx + 1 ? "page-link--active" : "page-link"}>{idx + 1}</p>  
                                } 
                            }else {
                                return <p key={idx} onClick={() => {
                                    setPage(idx + 1)
                                    console.log(idx)
                                }} className={page == idx + 1 ? "page-link--active" : "page-link"}>{idx + 1}</p>
                            }
                           
                        })


                    }

                        {totalPages > 10 ?
                        <div className='pagination-slice'>
                            <p>...</p>
                            <p key={totalPages} onClick={() => {
                                setPage(totalPages)
                            }} className={page == totalPages ? "page-link--active" : "page-link"}>{totalPages}</p>  
                        </div>

                        :
                        <></>
                        }
                    </div>
                    <button disabled={page == totalPages} onClick={()=>setPage(page + 1)} className='next-page-btn'><IoIosArrowForward className='arrow-forward'/></button>
                </div>

                :
                <></>
            }
            <CreateConsultationForm active={modalActive} setActive={setModalActive} setSuccessCreatePopupActive={setSuccessCreatePopupActive} fetchConsultations={fetchConsultations}/>

            {
            searchedCons.length != 0 ?
            <div className="consultations__container">
                {searchedCons.map((cons) => {
                    return <ConsultationCard key={cons.id} consultation = {cons} setSuccessSignupPopupActive={setSuccessSignupPopupActive}/>
                })}
            </div>
            :
            <div className='emtpy-list'>Консультаций пока нет...</div>
            }

        </div>
    );
}