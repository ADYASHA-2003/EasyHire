import { createContext,useContext,useEffect,useState } from "react";
import {decodeToken} from 'react-jwt'

export const AuthApplicantContext = createContext(null)

export const AuthApplicantProvider = (props) =>{
    const [applicantToken, setApplicantToken] = useState(null)
    const [isApplicantLoggedIn, setIsApplicantLoggedIn] = useState(false)
    const [applicant, setApplicant] = useState(null)

    useEffect(()=>{
        const jwtToken = localStorage.getItem('atoken')
        if(jwtToken){
            setApplicantToken(jwtToken)
            setIsApplicantLoggedIn(true)
            let decodedData = decodeToken(jwtToken)
            setApplicant(decodedData.applicant)
        }
    },[])

    const applicantLogin = (apptoken)=>{
        localStorage.setItem('atoken',apptoken)
        setApplicantToken(apptoken)
        setIsApplicantLoggedIn(true)
        let decodedData = decodeToken(apptoken)
        setApplicant(decodedData.applicant)
    }

    const applicantLogout = () =>{
        localStorage.removeItem('atoken')
        setIsApplicantLoggedIn(false)
    }

    return(
        <AuthApplicantContext.Provider value={{applicantToken, isApplicantLoggedIn, applicant, applicantLogin, applicantLogout}}>
            {props.children}
        </AuthApplicantContext.Provider>
    )
}

export const useApplicantAuth = () =>{
    const authApplicantContext = useContext(AuthApplicantContext)
    return authApplicantContext
}