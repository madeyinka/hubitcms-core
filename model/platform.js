const mongoose = require('mongoose')

const platformSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_user"
    },
    company:{
        name:{type:String, default:""},
        address:{type:String, default:"Not Set"},
        sector:{type:String, default:""},
        state:{type:String, default:""},
        country:{type:String, default:""},
        plan:{type:String, default:""},
        website:{type:String, default:"Not Set"},
        description:{type:String, default:""},
        logo:{type:String, default:""}
    }
})

module.exports = mongoose.model("platform", platformSchema)



//company: name, email, website, description, logo, status