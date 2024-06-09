const express = require('express')
const {addApplicant} = require('../controller/applicant.controller')

const applicantRouter = express.Router()

applicantRouter.post("/signup",addApplicant)

module.exports=applicantRouter
