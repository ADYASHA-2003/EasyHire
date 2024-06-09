const Applicant = require("../model/applicant.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Post a applicant signup/registration details 
async function addApplicant(req,res){
    try{
        let {name,email,mobile,password,dob,gender,location}=req.body

        let extEmail = await Applicant.findOne({email:email})
        if(extEmail){
            return res.status(400).json({message:"Email is already in use"})
        }

        let extMobile = await Applicant.findOne({mobile:mobile})
        if(extMobile){
            return res.status(400).json({message:"Mobile number is already in use"})
        }

        const salt = bcrypt.genSaltSync(10)
        password = bcrypt.hashSync(password,salt)

        let applicant = await Applicant.create({
            name:name,
            email:email,
            mobile:mobile,
            password:password,
            dob:dob,
            gender:gender,
            location:location
        })

        res.status(201).json({"message":"Applicant account created successfully",applicant:applicant})
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:error.message})
    }
}

module.exports = {
    addApplicant
}