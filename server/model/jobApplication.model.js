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
    //Allow options to choose from for next 2
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
        data: {
        //stores uploaded file in binary data format
          type: Buffer,
          required: true
        },
        contentType: {
          type: String,
          required: true
        },
        size: {
          type: Number,
          required: true,
          validate: {
            validator: (value) => value <= 300000,
            message: 'Resume size must be less than or equal to 300KB'
          }
        }
      },
    applicationDate: {
        type: Date,
        default: () => moment().tz('Asia/Kolkata').toDate()
    }
},{timestamps:true})

const JobApplication = mongoose.model("JobApplication",jobApplicationSchema)
module.exports = JobApplication