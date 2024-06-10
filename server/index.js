const express = require('express')
const dbConnect = require('./db/db')
const applicantRouter = require('./route/application.route')
const recruiterRouter = require('./route/recruiter.route')
const jobPostingRouter = require('./route/jobPosting.route')
const jobBoardRouter = require('./route/jobBoard.route')

require('dotenv').config()
// const cors = require('cors')

const PORT = process.env.PORT || 3000
const app=express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/applicant",applicantRouter)
app.use("/recruiter",recruiterRouter)
app.use("/jobPosting",jobPostingRouter)
app.use("/jobBoard",jobBoardRouter)

//healthcheck
app.get("/",(req,res)=>{
    res.send("Hello")
})

dbConnect()
app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))