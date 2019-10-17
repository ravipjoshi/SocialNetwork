const express = require('express');
const {getPosts,createPost} = require("../controller/post")
const validator = require("../validator")
const router = express.Router();


router.get("/",getPosts);

router.post("/post",createPost,validator.createPostValidator);


module.exports = router;
