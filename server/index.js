const express = require('express')
const dbConnect = require('./db/db')

require('dotenv').config()

const PORT = process.env.PORT || 3000
const app=express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//healthcheck
app.get("/",(req,res)=>{
    res.send("Hello")
})

dbConnect()
app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))