const JobPosting = require('../model/jobPosting.model')
const Applicant = require('../model/applicant.model');
const { application } = require('express');
const mongoose = require('mongoose');
const JobApplication = require('../model/jobApplication.model');

//Adding a new job post - auth recruiters only
async function addJobPost(req,res){
    try{
        let jobPost = await JobPosting.create(req.body)
        res.status(201).json({"message":"Job Post added successfully",jobPost:jobPost})
    }
    catch(error){
        console.log(error);
        res.status(400).json({"message":error.message})
    }
}

//Display all posts made by a recruiter - auth only
async function getAllPostsbyRecruiterId(req,res){
    try{
        const {recruiterId} = req.params
        const myJobPostings = await JobPosting.find({"recruiter":recruiterId})
        res.status(200).json(myJobPostings)
    }catch(error){
        console.log(error);
        res.status(500).json({"message":"Can't fetch your posts"})
    }
}

//Update a job post using job post id
async function updateJobPost(req,res){
    try{
        const {id}=req.params
        const updatedData = req.body
        const updatedJobPost = await JobPosting.findByIdAndUpdate(id,updatedData,{new:true})
        if(!updatedJobPost){
            return res.status(400).json({"message":"Job post not found"})
        }
        res.status(200).json({"message":"Job post updated successfully",updatedJobPost: updatedJobPost })
    }catch(error){
        console.log(error);
        res.status(400).json({message:error.message})
    }
}

//delete a job using jpb post id
async function deleteJobPost(req,res){
    try{
        const {id} = req.params
        const deletedJobPost = await JobPosting.findByIdAndDelete(id)

        if(!deletedJobPost){
            return res.status(400).json({"message":"Job post not found"})
        }
        res.status(200).json({"message":"Job post deleted successfully",deletedJobPost: deletedJobPost})
    }catch(error){
        console.log(error);
        res.status(400).json({message:error.message})
    }
}

//get all applicants filled for a job post under a recruiter
//obtain full applicant data from 2 collections - jobApplication and applicant
async function ApplicantAllData(jobPostId)
{
    try{
        const applicantAllData = await Applicant.aggregate([
            {
                $lookup:{
                    from:'jobapplications',
                    localField:'_id',
                    foreignField:'applicantId',
                    as:'applications'
                }
            },
            {
                $match: { 
                  'applications.jobId': new mongoose.Types.ObjectId(jobPostId)
                }
            },
            {
                $project:{
                    password:0,
               }
            }
        ])
        return applicantAllData
    }catch(error){
        console.log(error);
        throw new Error('Error preparing applicant data')
    }
}

//get applicants for a specific job post
async function getAllApplicantsForAJobPost(req,res){
    const {id:jobPostId} = req.params
    // const {recId} = req.recruiter;

    console.log("Job Post ID:", jobPostId);       
    // console.log("Recruiter ID:", recId);

    try{
        const jobPost = await JobPosting.findOne({ _id: jobPostId});
        if (!jobPost) {
            return res.status(403).json({ message: "Access denied" });
        }
        const applicants = await ApplicantAllData(jobPostId)
        res.status(200).json({message:"Successfully retrieved applicants for this job post",applicants:applicants})
    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message})
    }
}

module.exports = {
    addJobPost,getAllPostsbyRecruiterId,updateJobPost,deleteJobPost,getAllApplicantsForAJobPost
}