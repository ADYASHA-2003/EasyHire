const mongoose = require('mongoose')
const applicantSchema = new mongoose.Schema({
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
    dob:{
        type:Date,
        required:true,
        //remove unwanted white spaces
        trim:true
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    location:{
        //optional
        type:String,
    }
})

const Applicant = mongoose.model("Applicant",applicantSchema)
module.exports = Applicant
