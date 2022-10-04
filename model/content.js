const mongoose = require('mongoose')
const Category = require("./category")
const Post = require("./post")
const Author = require("./author")
const Service = require("./service")
const Component = require('./component')

const contentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_user"
    },
    categories:[Category.schema],
    posts:[Post.schema],
    post_authors:[Author.schema],
    services:[Service.schema],
    components:[Component.schema]
})

module.exports = mongoose.model("content", contentSchema)