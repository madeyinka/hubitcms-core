const dotenv = require('dotenv').config()
const _config = require('./../config/app.json')

const Connector = {

    _mongo: null,
    _google: null,
    _cloud: null,

    MongoDB: () => {
        if (Connector._mongo === null) {
            const mongoose = require('mongoose')
            const url = 'mongodb://'+_config.mongodb.host+':'+_config.mongodb.port+'/'+_config.mongodb.db
            Connector._mongo = mongoose.connection

            Connector._mongo.once('open', () => {console.log('Database Connection Initiated')})
            Connector._mongo.on('error', () => {console.log('Error Connecting to Database')})
            mongoose.Promise = global.Promise
            mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            return Connector._mongo
        }
    },

    // OAuth2: () => {
    //     if (Connector._google === null) {
    //         const { google } = require('googleapis')
    //         const Oauth2 = google.auth.OAuth2

    //         Connector._google = new Oauth2(_config.oauth.clientId, _config.oauth.secret)
    //         Connector._google.setCredentials({refresh_token:_config.oauth.refreshtoken})

    //         return Connector._google   
    //     }
    // }
}

module.exports = Connector