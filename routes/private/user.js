const express = require('express')
const router = express.Router()
const _config = require('../../config/app.json')
const auth = require('../../middlewares/auth')
const user = require('../../controllers/user.controller')

router.get('/', auth, user.getSingleUser)
router.put('/', auth, user.updateSingleUser)

module.exports = router