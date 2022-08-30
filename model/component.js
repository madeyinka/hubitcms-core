const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    id: {type:String},
    label: {type:String, default:""},
    slug: {type:String, default:""},
    description:{type:String, default:""},
    tags:{type:[Object], default:[]}
})

module.exports = mongoose.model("component", componentSchema)