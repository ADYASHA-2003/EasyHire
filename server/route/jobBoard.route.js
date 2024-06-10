const express = require('express')
const {allJobPosts,getJobPostbyId,addJobApplication}=require('../controller/jobBoard.controller')
const authenticateApplicant = require('../middlewares/authApplicant.middleware') 

const jobBoardRouter = express.Router()

jobBoardRouter.get("/",allJobPosts)
jobBoardRouter.get("/:id",getJobPostbyId)

jobBoardRouter.post('/apply/:jobId',authenticateApplicant,addJobApplication)

module.exports = jobBoardRouter