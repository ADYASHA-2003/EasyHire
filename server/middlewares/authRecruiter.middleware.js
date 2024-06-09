const jwt = require('jsonwebtoken')
const authenticateRecruiter = (req,res,next)=>{
    const token=req.header('Authorization')
    if(!token){
        return res.status(400).json({"message":"Unauthorized Access"})
    }

    let jwtToken = token.split(" ")[1]
    try{
        let decodedData=jwt.verify(jwtToken,process.env.JWT_SECRET)
        req.recruiter = decodedData.recruiter
        next()
    }catch(error){
        console.log(error);
        return res.status(400).json({"message":"Invalid token"})
    }
}

module.exports=authenticateRecruiter