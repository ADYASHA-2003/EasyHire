const express = require('express')
const {addJobPost, getAllPostsbyRecruiterId, updateJobPost,deleteJobPost, getAllApplicantsForAJobPost}=require('../controller/jobPosting.controller')
const authenticateRecruiter = require('../middlewares/authRecruiter.middleware')

const jobPostingRouter = express.Router()

jobPostingRouter.post("/",authenticateRecruiter,addJobPost)
jobPostingRouter.get("/:recruiterId",authenticateRecruiter,getAllPostsbyRecruiterId)
jobPostingRouter.put("/update/:id",authenticateRecruiter,updateJobPost)
jobPostingRouter.delete("/delete/:id",authenticateRecruiter,deleteJobPost)
jobPostingRouter.get("/applicants/:id",authenticateRecruiter,getAllApplicantsForAJobPost)


module.exports = jobPostingRouter