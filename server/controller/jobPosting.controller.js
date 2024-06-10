const JobPosting = require('../model/jobPosting.model')

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

module.exports = {
    addJobPost
}