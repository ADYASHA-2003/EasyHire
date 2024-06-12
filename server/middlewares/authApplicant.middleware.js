const jwt = require('jsonwebtoken')

const authenticateApplicant = (req,res,next)=>{
    const token=req.header('Authorization')
    if(!token){
        return res.status(400).json({"message":"Unauthorised Access"})
    }

    //extract actual JWT token without "Bearer" prefix
    let jwtToken=token.split(" ")[1]
    try{
        let decodedData=jwt.verify(jwtToken,process.env.JWT_SECRET)
        req.applicant = decodedData.applicant
        // req.user = {appId: decodedData.applicant.applId}
        next()
    }catch(error){
        console.log(error);
        return res.status(400).json({"message":"Invalid token"})
    }    
}

module.exports=authenticateApplicant