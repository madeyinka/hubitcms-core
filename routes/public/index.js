const express = require('express')
const router = express.Router()
const _config = require('./../../config/app.json')

const api = _config.app_base+_config.api._url+_config.api._version

router.use('/documentation', require('./documentation'))
router.use(api+'/register', require('./register'))
router.use(api +'/auth', require('./auth'))
router.use(api+'/public/content', require('./content'))

module.exports = router