import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Login} from './pages/Login/Login';
import {Signup} from './pages/Signup/Signup'
import {SignupTeacher} from './pages/SignupTeacher/SignupTeacher'
import {SignupStudent} from './pages/SignupStudent/SignupStudent'
import {Consultations} from './pages/Consultations/Consultations'
import {Consultation} from './pages/Consultation/Consultation'
import { MyConsultations } from './pages/MyConsultations/MyConsultations';
import { Schedules } from './pages/Schedules/Schedules';
import { Profile } from './pages/Profile/Profile';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { AuthContext, AuthProvider } from './context';

function App() {


  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route element={<Consultations/>} path='/consultations'/>
                <Route element={<Consultation/>} path='/consultations/:id' exact/>
                <Route element={<MyConsultations/>} path='/my-consultations' exact/>
                <Route element={<Profile/>} path='/profile' exact/>
                <Route element={<Schedules/>} path='/schedules' exact/>
            </Route>
            
            <Route element={<Login/>} path="/login"/>
            <Route element={<Login/>} path="/"/>
            <Route element={<Signup/>} path="/sign-up"/>
            <Route element={<SignupTeacher/>} path="/sign-up/teacher"/>
            <Route element={<SignupStudent/>} path="/sign-up/student"/>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
   
  );
}

export default App;
