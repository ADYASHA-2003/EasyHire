const JobPosting = require('../model/jobPosting.model')
const JobApplication = require('../model/jobApplication.model')
const multer = require('multer')
const upload = require('../middlewares/uploadResume.middleware')

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

//Add a new job application for selected job post
async function addJobApplication(req, res) {
    try {
        const { jobId } = req.params;
        const { qualification, course, university, startingYear, passingYear, keySkills } = req.body;
        const {applId} = req.applicant
        if (!req.file) {
            return res.status(400).json({ message: 'Resume is required' });
        }

        const newApplication = await JobApplication.create({
            jobId,
            applicantId: applId,
            qualification,
            course,
            university,
            startingYear,
            passingYear,
            keySkills: keySkills.split(','), 
            resume: {
                data: req.file.buffer, 
                contentType: req.file.mimetype,
                size: req.file.size
            }
        });

        res.status(201).json({ message: "Job application added successfully", newApplication });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = {allJobPosts,getJobPostbyId,addJobApplication}