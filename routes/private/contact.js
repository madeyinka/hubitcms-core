const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const contact = require('../../controllers/contact.controller')

router.post('/unit/create', auth, contact.createUnit)
router.get('/unit/pull', auth, contact.getUnits)
router.get('/messages/pull', auth, contact.getMessages)
router.post('/message/modify', auth, contact.update)

module.exports = router