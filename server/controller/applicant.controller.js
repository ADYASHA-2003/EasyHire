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

//Applicants' Login
const loginApplicant = async(req,res)=>{
    try{
        let {email,password} = req.body

        //Find applicant by comparing email entered with one stored in db
        let applicantInfo = await Applicant.findOne({email:email})
        if(!applicantInfo){
            return res.status(400).json({message:"Unable to find applicant.Provide valid emailid"})
        }

        //Password comparision
        let isPassValid = bcrypt.compareSync(
            password,
            applicantInfo.password
        )
        if(isPassValid){
            const token = jwt.sign(
                //takes valid applicant info from db and jwt secret key and carries it as decoded data
                {
                    //payload
                    applicant:{
                        applId: applicantInfo._id,
                        name:applicantInfo.name,
                        email:applicantInfo.email,
                        mobile:applicantInfo.mobile,
                        dob:applicantInfo.dob,
                        gender:applicantInfo.gender,
                        location:applicantInfo.location
                    }
                },
                process.env.JWT_SECRET
            )
            // console.log(token);
            res.status(200).json({
                message:"Applicant Login Successful",
                applicantInfo,
                token
            })
        }else{
            res.status(400).json({message:"Invalid Password"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = {
    addApplicant,
    loginApplicant
}