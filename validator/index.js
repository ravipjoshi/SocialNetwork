exports.createPostValidator = (req,res,next)=>{
    req.check("title","Write a title ").notEmpty()
    req.check("title","Title must be between 5 to 150").isLength({
        min: 5,
        max: 150
    })
    req.check("body","Write a body ").notEmpty()
    req.check("body","Title must be between 5 to 150").isLength({
        min: 5,
        max: 150
    })
    //Check for Errors
    const errors = req.validationErrors()
    if(errors)
    {
        const firstError = errors.map((error)=>error.msg)[0]
        return res.status(400).json({error: firstError});
    }
}