import { useState } from "react";
import applicantApiService from "../../apiService/ApplicantApiService";
import { useNavigate } from "react-router-dom";
// import '../../index.css';

const ApplicantSignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile,setMobile] = useState('')
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleDobChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString().split('T')[0]; // Format to yyyy-mm-dd
        setDob(formattedDate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newApplicant = {
            name, email, mobile, password, dob, gender, location
        };
        console.log(newApplicant);

        const res = await applicantApiService.addApplicant(newApplicant);
        console.log(res);
        if (res.status) {
            setMessage("Registration Successful");
            navigate("/signin");
        } else {
            setMessage(res.message);
        }
        setError(!res.status);
    };

    return (
        <div className="container mt-4">
            <div className="row p-0">
                <div className="col-md-6 mx-auto m-3">
                    <div className="card">
                        <div className="card-header text-center">
                            <h3>Sign Up</h3>
                            <p className={error ? 'text-danger' : 'text-success'}>{message}</p>
                        </div>
                        <div className="card-body">
                            <form action="" method="post" onSubmit={handleSubmit}>
                                <div className="mb-1">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="mb-1">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="xyz@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div className="mb-1">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="number" className="form-control" id="mobile" placeholder="1234567890" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" placeholder="Enter Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="dob">D.O.B</label>
                                    <input type="date" className="form-control" id="dob" value={dob} onChange={handleDobChange} required />
                                </div>

                                <div className="mb-4">
                                    <label>Gender</label>
                                    <div className="d-flex">
                                        <div className="form-check me-3">
                                            <input type="radio" className="form-check-input" id="genderMale" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} required />
                                            <label className="form-check-label" htmlFor="genderMale">Male</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" id="genderFemale" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} required />
                                            <label className="form-check-label" htmlFor="genderFemale">Female</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="location">Location</label>
                                    <input type="text" className="form-control" id="location" placeholder="Enter Address/City" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                </div>

                                <div className="my-1">
                                    <input type="submit" className="btn btn-primary w-100" value="Register" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img src="../../../ApplSignUp.jpg" alt="SignUpIllustration" className="img-fluid" />
                </div>
            </div>
        </div>
    )
};

export default ApplicantSignUp;
