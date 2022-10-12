const mongoose = require('mongoose')
const Unit = require('./units')
const Message = require('./message')

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_user"
    },
    units: [Unit.schema],
    messages:[Message.schema]
})

module.exports = mongoose.model("contact", contactSchema)