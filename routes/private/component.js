const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const component = require('../../controllers/component.controller')

router.post('/create', auth, component.createComponent)
router.get('/pull', auth, component.getAllComponents)
router.put('/update', auth, component.updateComponent)
router.delete('/delete', auth, component.deleteComponent)

module.exports = router