//setting: language, date-format, time-zone, config:{fb:{}, google:{}}
const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_user"
    },
    config: {
        fb_page_url: {type:String, default:""},
        fb_page_id: {type:String, default:""},
        fb_app_id: {type:String, default:""},
        fb_app_secret: {type:String, default:""}
    }
})

module.exports = mongoose.model("settings", settingSchema)