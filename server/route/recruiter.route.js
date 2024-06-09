const express = require('express')
const {addRecruiter, loginRecruiter} = require('../controller/recruiter.controller')

const recruiterRouter = express.Router()

recruiterRouter.post("/signup",addRecruiter)
recruiterRouter.post("/signin",loginRecruiter)

module.exports=recruiterRouter
