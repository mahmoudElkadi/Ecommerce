const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema({
userName:{
    type:String,
    required:true
},
email:{type:String},
password:{type:String},
confirmed:{
    type:Boolean,
    default:false}

})

userSchema.pre("save",function(next){
    this.password=bcrypt.hashSync(this.password,parseInt(process.env.SALT))
    next()
})


const userModel=mongoose.model("user",userSchema)
module.exports=userModel