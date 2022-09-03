const express = require('express')
const router = express.Router()
const content = require('../../controllers/public/content.controller')

router.get('/posts', content.getPosts)
router.get('/categories', content.getCategories)

module.exports = router