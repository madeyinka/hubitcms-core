const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
    id: {type:String},
    name:{type:String, default:""},
    slug:{type:String, default:""},
    email:{type:String, default:""},
    status:{type:Boolean, default:0},
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model("units", unitSchema)