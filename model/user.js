const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    display_name:{type:String, default:"Not Set"},
    email:{type:String, required:true},
    phone_number:{type:String, default:""},
    user_role:{type:String, default:"admin"},
    password:{type:String},
    api_token:{type:String},
    googleId:{type:String},
    facebookId:{type:String},
    is_active:{type:Boolean, default:0}
}, {timestamps:true})

module.exports = mongoose.model("user", userSchema)