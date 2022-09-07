const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const post = require('../../controllers/post.controller')

router.post('/create', auth, post.createPost)
router.post('/update', auth, post.updatePost)
router.get('/pull', auth, post.getAllPosts)

//post authors
router.post('/author/create', auth, post.createAuthor)
router.post('/author/update', auth, post.updateAuthor)
router.get('/author/pull', auth, post.getAllAuthors)

module.exports = router