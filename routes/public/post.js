const express = require('express')
const router = express.Router()
const post = require('../../controllers/public/post.controller')

router.get('/posts', post.getPosts)

module.exports = router