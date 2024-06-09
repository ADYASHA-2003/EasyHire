const Recruiter = require('../model/recruiter.model')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

//post a recruiter registration details
async function addRecruiter(req,res){
    try{
        let {name,email,mobile,password,companyName,companyLocation,industry} = req.body
        let extEmail = await Recruiter.findOne({email:email})
        if(extEmail){
            return res.status(400).json({message:"Email is already in use"})
        }

        let extMobile = await Recruiter.findOne({mobile:mobile})
        if(extMobile){
            return res.status(400).json({message:"Mobile number is already in use"})
        }

        const salt = bcrypt.genSaltSync(10)
        password = bcrypt.hashSync(password,salt)

        let recruiter = await Recruiter.create({
            name:name,
            email:email,
            mobile:mobile,
            password:password,
            companyName:companyName,
            companyLocation:companyLocation,
            industry:industry
        })

        res.status(201).json({"message":"Recruiter account created successfully",recruiter:recruiter})
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:error.message})
    }
}

module.exports={addRecruiter}