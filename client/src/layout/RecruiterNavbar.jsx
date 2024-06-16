import { Link } from 'react-router-dom';
import { useRecruiterAuth } from '../context/AuthRecruiterContext';

const RecruiterNavbar = () => {
    const { isRecruiterLoggedIn, recruiterLogout, recruiter } = useRecruiterAuth();

    const logoutRecruiter = () => {
        recruiterLogout();
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
                            <Link className="nav-link" to="/">
                                Find Jobs
                            </Link>
                        </li>
                        {isRecruiterLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-job-post">
                                        Post a Job
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {recruiter.name}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/recruiter-login" onClick={logoutRecruiter}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/recruiter-signup">
                                        Recruiter Sign Up
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/recruiter-login">
                                        Recruiter Sign In
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

export default RecruiterNavbar;
