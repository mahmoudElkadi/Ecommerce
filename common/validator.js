const headerDate=["body","params","query"]



const validationer=(schema)=>{
    return (req,res,next)=>{

        let errorList=[]

        headerDate.forEach((key)=>{
            if(schema[key]){
                const validated=schema[key].validate(req[key])
                console.log(validated.error);
                if(validated.error){
                    errorList.push(validated.error)
                }
            }
        })


if(errorList.length){
    res.json({message:"Error",errorList})
}
else{
    next()
}
}
}
module.exports = validationer;
