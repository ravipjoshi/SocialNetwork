const express = require("express");
const {signup,signin}= require("../controller/auth");
const {userSignupValidator}= require("../validator");
const router = express.Router();

router.post("/signup", userSignupValidator,signup);
router.post("/signin",signin);
module.exports = router;