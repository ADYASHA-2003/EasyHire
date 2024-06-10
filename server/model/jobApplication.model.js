const mongoose = require('mongoose')
const moment = require('moment-timezone');

const jobApplicationSchema = new mongoose.Schema({
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'JobPosting',
        required:true
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Rejected'], // Status of the application
        default: 'Applied'
    },
    //Educational details
    //Allow options to choose fromfor next 2
    qualification:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    university:{
        type:String,
        required:true
    },
    startingYear:{
        type:Number,
        required:true
    },
    passingYear:{
        type:Number,
        required:true
    },
    keySkills:{
        type:[String],
        required:true
    },
    resume: {
        data: Buffer, // Binary data of the uploaded file
        //pdf only : size<300kb
        contentType: {
            type: String,
            required: true
        }
    },
    applicationDate: {
        type: Date,
        default: () => moment().tz('Asia/Kolkata').toDate()
    }
},{timestamps:true})

const JobApplication = mongoose.model("JobApplication",jobApplicationSchema)
module.exports = JobApplication