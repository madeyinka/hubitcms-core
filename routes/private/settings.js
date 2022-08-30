const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const settings = require('../../controllers/settings.controller')

router.post('/configuration', auth, settings.configUpdate)
router.get('/', auth, settings.getAllSettings)


module.exports = router