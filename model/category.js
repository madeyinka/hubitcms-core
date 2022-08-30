const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    id:{type:String},
    label:{type:String, default:""},
    slug:{type:String, default:""},
    parent:{type:Object, default:{}},
    description:{type:String, default:""},
    image:{type:String, default:""},
    icon:{type:String, default:""},
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model("category", categorySchema)