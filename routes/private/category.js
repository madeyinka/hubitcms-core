const express = require("express")
const router = express.Router()
const auth = require('../../middlewares/auth')
const category = require("../../controllers/category.controller")

router.post('/create', auth, category.createCategory)
router.post('/update', auth, category.updateCategory)
router.get('/pull', auth, category.getAllCategories)

module.exports = router