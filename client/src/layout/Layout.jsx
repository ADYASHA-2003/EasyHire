import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ApplicantNavbar from './ApplicantNavbar';
import RecruiterNavbar from './RecruiterNavbar'; 

const Layout = () => {
    const location = useLocation();
    const isRecruiterRoute = location.pathname.startsWith('/recruiter') || location.pathname.startsWith('/add-job-post');

    return (
        <div className='bg-light'>
            {isRecruiterRoute ? <RecruiterNavbar /> : <ApplicantNavbar />}
            <div className='container pr-3'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
