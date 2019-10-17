const express = require('express')
const app = express()
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const expressValidator = require("express-validator");

dotenv.config();



//db 
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser : true}
     ).then(()=> console.log("db connected"));
//bring in routes

mongoose.connection.on("error",err =>{
    console.log(`Db Connection Error`);
})
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');



//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function (err,req,res,next){
    if(err.name === "UnauthorizedError"){
        res.status(401).json({error:"Unauthorized!"});
    }

})


const port = process.env.PORT || 8080

app. listen(port,()=> {
    console.log("A Node Js is running on port 8080");
});