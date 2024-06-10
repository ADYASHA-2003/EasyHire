const express = require('express')
const {allJobPosts,getJobPostbyId}=require('../controller/jobBoard.controller')
// const authenticateApplicant = require('../middlewares/authApplicant.middleware')

const jobBoardRouter = express.Router()

jobBoardRouter.get("/",allJobPosts)
jobBoardRouter.get("/:id",getJobPostbyId)

module.exports = jobBoardRouter