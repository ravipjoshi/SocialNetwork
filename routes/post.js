const express = require('express');
const {getPosts,createPost} = require("../controllers/post")
const {createPostValidator} = require("../validator")
const {requireSignin} = require("../controllers/auth")
const {userById} = require("../controllers/user")
const router = express.Router();


router.get("/",getPosts);

router.post("/post",requireSignin,createPostValidator,createPost);

//any routes cpnntaining userid , app will first execute userbyID
router.param("userId", userById);


module.exports = router;
