const express = require('express')
const router = express.Router()
const {validator} = require('../../libraries/Utility')
const {validate, registerUser, userUpdate} = require('../../controllers/register.controller')

router.post('/new', validate('body'), validator, registerUser)
router.post('/update', validate('company'), validator, userUpdate)

module.exports = router