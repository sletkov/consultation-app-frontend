import {Routes, Route} from 'react-router-dom'
import {publicRoutes, privateRoutes} from '../router/routes';
import { useContext } from 'react';
import { AuthContext } from '../context';
import {Consultations} from './pages/Consultations/Consultations'
import {Login} from './pages/Login/Login'

export function AppRouter(){
    const {isAuth} = useContext(AuthContext);

    return (
        isAuth
            ?
        <Routes>
              {privateRoutes.map((route, index) => 
                <Route
                    key={index}
                    path={route.path}
                    element={<route.element/>}
                />
            )}
            <Route path="/*" element={<Consultations/>}/>  
        </Routes>

        :

        <Routes>
            {publicRoutes.map((route, index) => 
                <Route
                    key={index}
                    path={route.path}
                    element={<route.element/>}
                />
            )}
            <Route path="/*" element={<Login/>}/>  
        </Routes>
    )
}