const _ = require("lodash");
const User = require("../models/user");

exports.userById = (req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        } 
        // ADDS Profile object in req with user info
        req.profile = user ;
        next();
    })
}

exports.hasAuthorization = (req,res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!authorized){
        return res.status(403).json({
            error : "User is not authorized to perform this action"
        })
    }
    next();
}

exports.allUsers = (req,res)=>{
    User.find((err,users)=>{
        if(err){
            return res.status(400).json({
                error : err
            })
        }
        res.json({ users });
    }).select("name email updated created");
};

exports.getUser = (req,res) =>{
    req.profile.has_password = undefined;
    req.profile.salt = undefined;
    console.log(req.profile);
    return res.json(req.profile);
};

exports.updateUser=(req,res,next) =>{

    let user = req.profile
    // mutate the source object by using extend
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err) =>{
        if(err){
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            })
        }
        user.has_password = undefined;
        user.salt = undefined;
        res.json({ user })
    })
}

exports.deleteUser=(req,res,next) => {
    let user = req.profile;
    user.remove((err,user)=>{
        if(err){
            return res.status(400).json({
                error : err
            })
        }
        user.has_password = undefined;
        user.salt = undefined;
        res.json({ user })
    })
}