import { createContext, useState, useEffect, useCallback } from "react" 
import Cookies from 'js-cookie'

export const AuthContext = createContext({
    user:null,
    token: null,
    isLoggedIn:false,
    login: (user, token) => {},
    logout: () => {},
}
);

export const AuthProvider = ({children}) => {
    const [user, setUser] =  useState()
    const [token, setToken] =  useState()

    const loginHandler = useCallback((user, token)=>{
        setUser(user)
        setToken(token)
        localStorage.setItem("userData", JSON.stringify(user))
    })

    const logoutHandler = useCallback(()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem("userData")
        Cookies.remove("consultation-app")
    })

    const initialValues = {
        user: user,
        token: token,
        isLoggedIn: !!token,
        login: loginHandler,
        logout: logoutHandler,
    }


    useEffect(()=>{
       if (user || token) {
        localStorage.setItem("userData", JSON.stringify({user, token}))
       } else {
        localStorage.removeItem("userData")
       }
    }, [user, token])

    return(
        <AuthContext.Provider value={initialValues}>
            {children}
        </AuthContext.Provider>
    );
}