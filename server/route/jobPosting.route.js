const express = require('express')
const {addJobPost, getAllPostsbyRecruiterId, updateJobPost}=require('../controller/jobPosting.controller')
const authenticateRecruiter = require('../middlewares/authRecruiter.middleware')

const jobPostingRouter = express.Router()

jobPostingRouter.post("/",authenticateRecruiter,addJobPost)
jobPostingRouter.get("/:recruiterId",authenticateRecruiter,getAllPostsbyRecruiterId)
jobPostingRouter.put("/update/:id",authenticateRecruiter,updateJobPost)

module.exports = jobPostingRouter