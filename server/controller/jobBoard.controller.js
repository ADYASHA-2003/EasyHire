const JobPosting = require('../model/jobPosting.model')


//Display all job posts
async function allJobPosts(req,res){
    try{
        let jobPosts = await JobPosting.find()
        res.status(200).json(jobPosts)
    }catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
    }
}


//Display job post by id - view details
const getJobPostbyId = async(req,res)=>{
    try{
        const {id} = req.params
        // console.log(id);
        const jobPost = await JobPosting.find({"_id":id})
        if(jobPost.length > 0){
            res.status(200).json(jobPost)
        }else{
            res.status(400).json({"message":"Record not found.Check ID and try again"})
        }
    }catch(error){
        if(error.name==="CastError"){
            res.status(400).json({"message": "Invalid Id"})
        }else {
            res.status(500).json(error)
        }
    }
}

module.exports = {allJobPosts,getJobPostbyId}