const express = require('express')
const router = express.Router()
const _config = require('./../../config/app.json')

const api = _config.app_base+_config.api._url+_config.api._version

router.use(api+'/user', require('./user'))
router.use(api+'/settings', require('./settings'))
router.use(api+'/component', require('./component'))
router.use(api+'/category', require('./category'))
router.use(api+'/post', require('./post'))
router.use(api+'/assets', require('./assets'))
router.use(api+'/service', require('./service'))

module.exports = router