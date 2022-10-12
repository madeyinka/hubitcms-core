const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    id:{type:String},
    title:{type:String, default:""},
    name:{type:String, default:""},
    unit:{type:Object, default:null},
    theme:{type:String, default:""},
    message:{type:String, default:""},
    closed:{type:Boolean, default:0},
    marked:{type:Boolean, default:0},
    reply:[],
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model('message', messageSchema)