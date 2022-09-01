const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    id:{type:String},
    title:{type:String, default:""},
    slug:{type:String, unique:true, default:""},
    category:{type:Object, required:true},
    subcategory:{type:Object, default:{}},
    short_content:{type:String, default:""},
    content:{type:String, default:""},
    keywords:{type:[Object], default:[]},
    link:{type:String, default:""},
    type:{type:Object, default:{}},
    image:{type:String, default:""},
    media:{type:String, default:""},
    author:{type:String, default:""},
    post_settings: {
        featured:{type:Boolean, default:0},
        slider:{type:Boolean, default:0},
        popular:{type:Boolean, default:0},
        editor:{type:Boolean, default:0},
        facebook:{type:Boolean, default:0},
        instagram:{type:Boolean, default:0},
        twitter:{type:Boolean, default:0}
    },
    seo:{
        title:{type:String, default:""},
        keywords:{type:[Object], default:[]},
        description:{type:String, default:""}
    },
    status:{type:Boolean, default:0},
    pub_date:{type:Date, default:Date.now},
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model("post", postSchema)