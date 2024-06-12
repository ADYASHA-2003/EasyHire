const express = require('express')
const {allJobPosts,getJobPostbyId,addJobApplication}=require('../controller/jobBoard.controller')
const authenticateApplicant = require('../middlewares/authApplicant.middleware') 
const upload = require('../middlewares/uploadResume.middleware')

const jobBoardRouter = express.Router()

jobBoardRouter.get("/",allJobPosts)
jobBoardRouter.get("/:id",getJobPostbyId)

jobBoardRouter.post('/application/:jobId',upload.single('resume'),authenticateApplicant,addJobApplication)

module.exports = jobBoardRouter