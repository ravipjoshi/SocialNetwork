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
    //proceeds to next middleware
    next();
}

exports.userSignupValidator = (req,res,next) =>{
    //server side validation
    
    // name is not null
    req.check("name","name is required").notEmpty();
    
    //email is not null and valid and normalized

    req.check("email","Email must be between 3 to 32 charachters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min : 4,
        max:32
    })

    req.check("password","password isrequired").notEmpty();
    req.check("password")
    .isLength({min:6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number")
    //Check for Errors
    const errors = req.validationErrors()
    if(errors)
    {
        const firstError = errors.map((error)=>error.msg)[0]
        return res.status(400).json({error: firstError});
    }

    //proceeds to next middleware
    next();
}