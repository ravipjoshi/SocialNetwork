const jwt = require("jsonwebtoken");
require("dotenv").config;
const User = require("../models/user");
const expressJwt = require("express-jwt");


exports.signup = async (req,res) =>{
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).json({
        error: "Email is taken"
    })
    const user = await new User(req.body);
    await user.save();
    res.status(200).json( {user});
}

exports.signin = (req,res) =>{
    //Find the user based on email
    
    const {email,password} = req.body
    User.findOne({email},(err,user)=>{
        //If error of no user
        if(err || !user){
            return res.status(401).json({
                error: "User with that email does not exist. Please sign in."
            })
        }
    
        //if user is found make sure the email and password match
        //Authenticate the user
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }
         //generate a token wiith userid and secret 

         const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

         //persist the token  in cookie
    
         res.cookie("t",token,{expire:new Date() + 9999});

         // retrun response with user email and token    
         const {_id,name,email}=user
         return res.json({token,user:{_id,email,name}})         
    })
}

exports.signout = (req,res) =>{
    res.clearCookie("t"); 

    return res.json({message: "signout success"});

}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
})