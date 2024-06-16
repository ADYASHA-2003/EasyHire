import { createContext,useContext,useEffect,useState } from "react";
import {decodeToken} from 'react-jwt'

export const AuthRecruiterContext = createContext(null)

export const AuthRecruiterProvider = (props) =>{
    const [recruiterToken, setRecruiterToken] = useState(null)
    const [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false)
    const [recruiter, setRecruiter] = useState(null)

    useEffect(()=>{
        const jwtToken = localStorage.getItem('rtoken')
        if(jwtToken){
            setRecruiterToken(jwtToken)
            setIsRecruiterLoggedIn(true)
            let decodedData = decodeToken(jwtToken)
            setRecruiter(decodedData.recruiter)
        }
    },[])

    const recruiterLogin = (rectoken)=>{
        localStorage.setItem('rtoken',rectoken)
        setRecruiterToken(rectoken)
        setIsRecruiterLoggedIn(true)
        let decodedData = decodeToken(rectoken)
        setRecruiter(decodedData.recruiter)
    }

    const recruiterLogout = () =>{
        localStorage.removeItem('rtoken')
        setIsRecruiterLoggedIn(false)
    }

    return(
        <AuthRecruiterContext.Provider value={{recruiterToken, isRecruiterLoggedIn, recruiter, recruiterLogin, recruiterLogout}}>
            {props.children}
        </AuthRecruiterContext.Provider>
    )
}

export const useRecruiterAuth = () =>{
    const authRecruiterContext = useContext(AuthRecruiterContext)
    return authRecruiterContext
}