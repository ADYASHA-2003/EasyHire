const express = require('express')
const {addRecruiter} = require('../controller/recruiter.controller')

const recruiterRouter = express.Router()

recruiterRouter.post("/signup",addRecruiter)
// applicantRouter.post("/signin",loginApplicant)

module.exports=recruiterRouter
