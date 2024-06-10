const express = require('express')
const {addJobPost}=require('../controller/jobPosting.controller')
const authenticateRecruiter = require('../middlewares/authRecruiter.middleware')

const jobPostingRouter = express.Router()

jobPostingRouter.post("/",authenticateRecruiter,addJobPost)

module.exports = jobPostingRouter