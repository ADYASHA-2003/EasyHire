import { Link, useNavigate } from 'react-router-dom';
import { useApplicantAuth } from '../context/AuthApplicantContext';

const ApplicantNavbar = () => {
    const { isApplicantLoggedIn, applicantLogout, applicant } = useApplicantAuth();

    const logoutApplicant = () => {
        applicantLogout();
        useNavigate("/")
    };

    return (
        <nav className="navbar navbar-expand-lg bg-light shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <h3>EASY HIRE</h3>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/jobBoard">
                                Job Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/recruiter-login">
                                Recruiters
                            </Link>
                        </li>
                        {isApplicantLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {applicant.name}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin" onClick={logoutApplicant}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="applicant/signup">
                                        Sign Up
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="applicant/signin">
                                        Sign In
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ApplicantNavbar;
