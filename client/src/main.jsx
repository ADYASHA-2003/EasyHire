import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthApplicantProvider } from './context/AuthApplicantContext.jsx'
import { AuthRecruiterProvider } from './context/AuthRecruiterContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthRecruiterProvider>
      <AuthApplicantProvider>
        <App />
      </AuthApplicantProvider>
    </AuthRecruiterProvider>
  </React.StrictMode>,
)
