const express = require('express')
const router = express.Router()
const contact = require('../../controllers/public/contact.controller')

router.post('/new', contact.postMessage)
router.get('/unit/pull', contact.getUnits)

module.exports = router