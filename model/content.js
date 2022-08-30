const mongoose = require('mongoose')
const Category = require("./category")
const Post = require("./post")

const contentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_user"
    },
    categories:[Category.schema],
    posts:[Post.schema]
})

module.exports = mongoose.model("content", contentSchema)