// const express = require('express');
const JobPosting = require('../model/jobPosting.model')

//Adding a new job post - auth recruiters only
async function addJobPost(req,res){
    try{
        let jobPost = await JobPosting.create(req.body)
        res.status(201).json(jobPost)
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

module.exports = {
    addJobPost,getAllPostsbyRecruiterId
}