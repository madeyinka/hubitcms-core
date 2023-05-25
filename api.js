//npm requirements
const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

//module requirements
const _config = require('./config/app.json')
const Logger = require('./libraries/Logger')
const {MongoDB} = require('./libraries/Connector')
const credentials = require('./middlewares/credentials')
const corsOptions = require('./config/cors/options')
const {PORT} = process.env

//initialize express + middlewares
const app = express()
//connect to database
MongoDB()

app.use(credentials)
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(require('./routes/public'))
app.use(require('./routes/private'))
//app.use(cookieParser())
 
//handle image reference in prodcution env.
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    Logger.init({msg:_config.app_name+ ' version '+_config.app_version+ ' Listening on http://[:]'+PORT+_config.app_base+_config.api._url+_config.api._version})
})