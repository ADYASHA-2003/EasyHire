import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

import Layout from './layout/Layout'
import ApplicantSignUp from "./pages/Applicant/ApplicantSignUp"
import ApplicantSignIn from "./pages/Applicant/ApplicantSignIn"

import React from 'react'
import JobPostsDisplay from "./pages/Applicant/JobPostsDisplay"

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path: "applicant",
          children: [
            { path: "signup", element: <ApplicantSignUp /> },
            {path:"signin",element:<ApplicantSignIn/>}
          ]
        },
        {
          path:"jobBoard",
          children:[
            {path:"",element:<JobPostsDisplay/>}
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router}/>
}

export default App
