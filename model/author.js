const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    id:{type:String},
    name:{type:String, default:""},
    slug:{type:String, default:""},
    profile:{type:String, default:""},
    image:{type:String, default:""},
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model("author", authorSchema)