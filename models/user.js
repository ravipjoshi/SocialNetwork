const mongoose = require ("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required : true
    },
    email:{
        type:String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true

    },
    salt : String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

//Virtual Fields

userSchema.virtual('password')
.set(function(password){
   // Temp Variable 
    this._password = password
  // generate time stamp for salt
    this.salt = uuidv1()
 // encrypt password
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
}) 

userSchema.methods = {
    encryptPassword: function(password){
        if(!password) return "";
        try{
            return crypto.createHmac('sha1',this.salt)
                .update(password)
                .digest("hex");
        }
        catch{
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);
