const { signUp,logIn ,confirmedEmail} = require("./user.controller")

const userRouter=require("express").Router()
const validationer=require("../../common/validator")
const {userValidationSchema,userLogInValidationSchema}=require("./validation")

userRouter.post("/signUp",validationer(userValidationSchema),signUp)
userRouter.post("/logIn",validationer(userLogInValidationSchema),logIn)
userRouter.get('/api/user/confirmation/:token',confirmedEmail)






module.exports=userRouter