const userModel=require("../../DB/user.model")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const sendEmail=require("../../common/sendEmail")


const signUp=async(req,res)=>{
    const {userName , email ,password}=req.body
    const foundUser=await userModel.findOne({email:email})
    if (foundUser) {
        res.status(400).json({Error:"user is used"})
    } else {
    const addUser=await new userModel({userName , email ,password}).save()
    res.status(200).json({massage:"Added user",addUser}) 
    var token = jwt.sign({id:addUser._id}, process.env.TOKEN_KEY);
    const message = `<div style="text-align:center">
      <h1>If You Registed in E-commerce application, please open link below to verify it was you</h1>
      <a style="border:1px solid grey;padding:8px;border-radius:8px;text-decoration:none" href="${req.protocol}://${req.headers.host}/api/user/confirmation/${token}">click here</a>
    </div>`;   
    sendEmail(email,message)
    } 

}

const logIn=async(req,res)=>{
    const {email , password}=req.body
    const foundUser=await userModel.findOne({email})
    if (foundUser){
        bcrypt.compare(password,foundUser.password,(err,result)=>{
            if (result) {
                var token = jwt.sign({id:foundUser._id}, process.env.TOKEN_KEY);
                    res.status(200).json({message:"done",token})
            }else{
                res.status(400).json({message:"password not correct"})
            }
        })
    }else{
        res.status(400).json({message:"email not found"})

    }

}

const confirmedEmail=async(req,res)=>{
 //   try {
        const {token}=req.params
        const {id}=jwt.verify(token,process.env.TOKEN_KEY)
        console.log(id);
    
        let user=await userModel.findOne({_id:id,confirmed:false},{})
        if(user){
        let updateUser= await userModel.findByIdAndUpdate(id,{confirmed:true},{new:true})
            res.json({message:"confirme",updateUser})
        }    
        } 
        //catch (error) {
    //     res.status(500).json({message:"error",error})
    
    // }
    

module.exports={signUp,logIn,confirmedEmail}