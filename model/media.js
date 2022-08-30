const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    id:{type:String, default:""},
    public_id:{type:String, default:""},
    type:{type:String, default:""},
    format:{type:String, default:""},
    size:{type:String, default:""},
    url:{type:String, default:""},
    secure_url:{type:String, default:""},
    width:{type:String, default:""},
    height:{type:String, default:""},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_user"
    }
})

module.exports = mongoose.model("media", mediaSchema)