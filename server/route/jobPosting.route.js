const express = require('express')
const {addJobPost, getAllPostsbyRecruiterId}=require('../controller/jobPosting.controller')
const authenticateRecruiter = require('../middlewares/authRecruiter.middleware')

const jobPostingRouter = express.Router()

jobPostingRouter.post("/",authenticateRecruiter,addJobPost)
jobPostingRouter.get("/:recruiterId",authenticateRecruiter,getAllPostsbyRecruiterId)

module.exports = jobPostingRouter