const jwt=require("jsonwebtoken");
const userModel = require("../DB/user.model");



const auth=(data)=>{
    return async(req,res,next)=>{
        console.log(req.headers);
        let tokenHeader=req.headers["authorization"]
        if(!tokenHeader||!tokenHeader.startsWith("Bearer")){
            res.status(400).json({mesage:"in valid token"})
        }else{
        let token =tokenHeader.split(" ")[1]
        let{id}=jwt.verify(token,process.env.JWTKEY) 
        let user=await userModel.findOne({_id:id}).select("-password")
        if(!user){
            res.status(500).json({message:"not fouind user"})
        }else{
            req.user=user
            
        }
        
    }
    }

}
module.exports={auth}