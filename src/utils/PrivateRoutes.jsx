import { useContext } from "react";
import {Outlet, Navigate} from "react-router-dom";
import { AuthContext } from "../context";
import Cookies from 'js-cookie'

export const PrivateRoutes = () => {
    const token = Cookies.get("consultation-app")
    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}
