const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const service = require('../../controllers/service.controller')

router.post('/create', auth, service.createService)
router.post('/update', auth, service.updateService)
router.get('/pull', auth, service.getAllServices)

module.exports = router