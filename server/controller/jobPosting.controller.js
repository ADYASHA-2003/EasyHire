// const express = require('express');
const JobPosting = require('../model/jobPosting.model')

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

module.exports = {
    addJobPost,getAllPostsbyRecruiterId,updateJobPost,deleteJobPost
}