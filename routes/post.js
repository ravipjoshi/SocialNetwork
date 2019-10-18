const express = require('express');
const {getPosts,createPost,postByUser,postById} = require("../controllers/post")
const {createPostValidator} = require("../validator")
const {requireSignin} = require("../controllers/auth")
const {userById} = require("../controllers/user")
const router = express.Router();


router.get("/",getPosts);
router.post("/post/new/:userId",requireSignin,createPost,createPostValidator);
router.get("/posts/by/:userId",requireSignin,postByUser)

//any routes cpnntaining userid , app will first execute userbyID
router.param("userId", userById);


//any routes containing postid , app will first execute userbyID
router.param("userId", postById);


module.exports = router;
