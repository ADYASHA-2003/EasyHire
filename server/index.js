const express = require('express')
const dbConnect = require('./db/db')
const applicantRouter = require('./route/application.route')

require('dotenv').config()
// const cors = require('cors')

const PORT = process.env.PORT || 3000
const app=express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/applicant",applicantRouter)

//healthcheck
app.get("/",(req,res)=>{
    res.send("Hello")
})

dbConnect()
app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))