const joi = require('joi')

const userValidationSchema={
    body:joi.object().required().keys({
        userName:joi.string(),
        email:joi.string().email().required(),
        password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        
    })

}


const userLogInValidationSchema={
    body:joi.object().required().keys({
        
        email:joi.string().email().required(),
        password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    })

}

module.exports={userValidationSchema,userLogInValidationSchema}