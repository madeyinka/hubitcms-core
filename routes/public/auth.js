const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const {validator} = require('../../libraries/Utility')
const {validate, loginUser, refresh} = require('../../controllers/login.controller')

router.use(cookieParser())

router.post('/login', validate('login'), validator, loginUser)
router.get('/refresh', refresh)




module.exports = router