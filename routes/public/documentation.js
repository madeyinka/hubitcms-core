const express = require('express')
const path = require('path')
const router = express.Router()
const YAML = require('yamljs')
const swaggerUIExpress = require('swagger-ui-express')

const swaggerDocs = YAML.load(path.join(__dirname, './../../swagger.yaml'))

router.use('/api', swaggerUIExpress.serve)
router.get('/api', swaggerUIExpress.setup(swaggerDocs))

module.exports = router