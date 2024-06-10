const JobPosting = require('../model/jobPosting.model')
const JobApplication = require('../model/jobApplication.model')
// const multer = require('multer')

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

//Ensuring limit to file upload - only one file upload is expected
// const upload = multer({
//     limits:{fileSize:300*1024},
//     fileFilter:(req,file,cb)=>{
//         if(file.mimetype === 'application/pdf'){
//             cb(null,true)
//         }else{
//             cb(new Error('Only PDF files allowed'))
//         }
//     }
// })

//Add a new job application for selected job post
async function addJobApplication(req, res) {
    try {
        const { jobId } = req.params; // Extract jobId from URL params
        const { qualification, course, university, startingYear, passingYear, keySkills } = req.body;

        // Get applId from req.user
        const { applId } = req.user;
        const newApplication = await JobApplication.create({
            jobId,
            applicantId: applId,
            qualification,
            course,
            university,
            startingYear,
            passingYear,
            keySkills: keySkills.split(','), // Assuming keySkills is provided as a comma-separated string
            // Other fields as needed
        });

        res.status(201).json({ message: "Job application added successfully", newApplication });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}



module.exports = {allJobPosts,getJobPostbyId,addJobApplication}