const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const post = require('../../controllers/post.controller')

router.post('/create', auth, post.createPost)
router.post('/update', auth, post.updatePost)
router.get('/pull', auth, post.getAllPosts)

module.exports = router