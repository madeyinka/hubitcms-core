const _config = require('../config/app.json')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv').config()

const Utility = {
    date_time: function(dt){
        const moment = require('moment-timezone');
        return moment.tz(dt, "Africa/Lagos").format('YYYY-MM-DD HH:mm:ss');
    },

    validator: (req, res, next) => {
        const {validationResult} = require('express-validator')
        const errors = validationResult(req)

        if (errors.isEmpty()) return next();

        const extractedErrors = []
            errors.array().map(err => extractedErrors.push({message: `${err.param} ${err.msg}`}))

            const response = {
                success: false,
                message: "Request is not valid",
                error: {
                    code:400,
                    description:extractedErrors[0].message
                }
            }
        if (extractedErrors.length > 0) {
            response.error.errors = extractedErrors
        }

        return res.status(400).json(response)
    },

    tokenize: (payload) => {
        const jwt = require('jsonwebtoken')
        return jwt.sign(payload, _config.jwt.key, {expiresIn: _config.jwt.expires})
    },

    hashed: (value) => {
        const bcrypt = require('bcryptjs')
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(value, salt)
    },

    getRefreshToken: (payload) => {
        const jwt = require('jsonwebtoken')
        return jwt.sign({"id": payload.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'1d'})
    },

    getAccessToken: (payload) => {
        const jwt = require('jsonwebtoken')
        return jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d'}
        )
    }
}

module.exports = Utility