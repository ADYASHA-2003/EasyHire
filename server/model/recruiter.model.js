const mongoose = require('mongoose')
const recruiterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    companyLocation:{
        type:String,
        required:true
    },
    industry:{
        //optional
        type:String
    }
})


const Recruiter = mongoose.model("Recruiter",recruiterSchema)
module.exports = Recruiter
