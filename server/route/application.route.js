const express = require('express')
const {addApplicant, loginApplicant} = require('../controller/applicant.controller')

const applicantRouter = express.Router()

applicantRouter.post("/signup",addApplicant)
applicantRouter.post("/signin",loginApplicant)

module.exports=applicantRouter
