const UserModel = require('../model/admin_user')
const PlatformModel = require('../model/platform')
//const _config = require('../config/app.json')
const {body} = require('express-validator')
const bcrypt = require('bcryptjs')
const Util = require('../libraries/Utility')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const LoginInit = {
    validate: (method) => {
        switch(method) {
            case "login": {
                return [
                    body("email").isEmail(),
                    body("password")
                ]
            }
        }
    },

    //admin user login
    loginUser: async (req, res) => {
        const {email, password} = req.body

        //get user instance
        const user = new UserModel({})
        user.local.email = email
        user.local.password = password
        user.identifier = email

        //check if user exists in DB
        await UserModel.findOne({identifier: email})
        .then((userExist) => {
            if (userExist) {
                bcrypt.compare(user.local.password, userExist.local.password)
                .then((isMatch) => {
                    if (isMatch) {
                        if (userExist.local.is_active) {
                            PlatformModel.findOne({user:userExist._id})
                            .then(state => {
                                const payload = {id:userExist._id, role:userExist.local.user_role, website:state.company.website}
                                const rtoken = Util.getRefreshToken(payload) //get user refresh token
                                const atoken = Util.getAccessToken(payload) // get access token

                                userExist.api_token = rtoken
                                userExist.save()

                                //set http cookie valid for 1 day
                                res.cookie('jwt', rtoken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
                                return res.status(200).json({
                                    success: true,
                                    message: "You 're logged in successfully",
                                    data: {
                                        statusCode: 200,
                                        token: atoken
                                    }
                                })
                            })
                        } else {
                            return res.status(401).json({
                                success: false,
                                message: "Account not activated or suspended",
                                error: {
                                    statusCode: 401,
                                    description: "Inactive or suspended account."
                                }
                            })
                        } //account is pending...activate or resend code.
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: "Invalid Credentials",
                            error: {
                                statusCode: 401,
                                description: "Invalid Credentials"
                            }
                        })
                    }
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Invalid Credentials",
                    error: {
                        statusCode: 404,
                        description: "Invalid Credentials"
                    }
                })
            }
        })
    },

    refresh: async (req, res) => {
        const cookies = req.cookies
        if (!cookies?.jwt) {
            return res.sendStatus(403)
        }
        const rtoken = cookies.jwt
        console.log(cookies?.jwt)
        await UserModel.findOne({api_token:rtoken})
        .then((fuser) => {
            if (fuser) {
                jwt.verify(rtoken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (fuser._id == decoded.id) {
                        const payload = {id:decoded.id, role:fuser.local.user_role}
                        const atoken = Util.getAccessToken(payload)
                        return res.status(200).json({
                            success: true,
                            message: "Success",
                            data: {
                                statusCode: 200,
                                token:atoken
                            }
                        })
                    } else {
                        return res.status(403)
                    }
                })
            }
        })
        .catch (err => {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
                error: {
                    statusCode: 403,
                    description: "Invalid token"
                }
            })
        })
    }
}

module.exports = LoginInit