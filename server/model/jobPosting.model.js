const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location:{
        type:String,
        required:true
    },
    openings:{
        type:Number,
        required:true
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType:{
        type:String,
        enum:['Full-time','Part-time','Internship','Remote']
    },
    experience:{
        type:String,
        required:true,
    },
    bonusOpt:{
        type:String,
        required:true,
        enum:['Yes','No']
    },
    vacation: {
        type: Number, // Number of vacation days
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true,
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
    }],
},{ timestamps: true });


const JobPosting = mongoose.model("JobPosting",jobPostingSchema)
module.exports = JobPosting

