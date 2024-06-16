import { useState } from "react";
// import userApiService from "../ApiService/UserApiService";
import applicantApiService from "../../apiService/ApplicantApiService";
import {useNavigate} from "react-router-dom"
import {useApplicantAuth} from "../../context/AuthApplicantContext"

const ApplicantSignIn = () => {
    const navigate = useNavigate()
    const authApplicantContext = useApplicantAuth()
    const {applicantLogin} = authApplicantContext

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async(e) => {
      e.preventDefault()
      const applicant = {
        email, password
      }
      console.log(applicant);

      const res = await applicantApiService.loginApplicant(applicant)
      console.log(res);
      if(res.status){
        setMessage("Login Successfull")
        applicantLogin(res.data.token)
        navigate("/")
      }else{
        setMessage(res.message)
      }
      setError(!res.status)
    }

  return (
    <div className="row p-5">
      <div className="col-md-6 mx-auto m-3">
        <div className="card">
          <div className="card-header text-center ">
            <h3>Sign In</h3>
            <p className={error? 'text-danger':'text-success'}>{message}</p>
          </div>
          <div className="card-body">
            <form action="" method="post" onSubmit={handleSubmit}>

              <div className="mb-1">
                <label htmlFor="">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder="Enter Registered Email"/>
              </div>

              <div className="mb-4">
                <label htmlFor="">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder="Enter Your Password"/>
              </div>

              <div className="my-1">
                <input type="submit" className="btn btn-primary w-100" value="Log In" />
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ApplicantSignIn
