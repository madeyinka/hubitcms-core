const UserModel = require('../model/admin_user')
const PlatformModel = require('../model/platform')
const {body} = require('express-validator')
const Util = require('../libraries/Utility')
const _config = require('../config/app.json')
const {sendMail} = require('../libraries/Mailer')
const bcrypt = require('bcryptjs')

const RegisterInit = {

    validate: (method) => {
        switch(method) {
            case "body": {
                return [
                    body("first_name").isString(),
                    body("last_name").isString(),
                    body("display_name").isString(),
                    body("email").isEmail(),
                    body("phone_number").isInt(),
                    body("password").isLength({min:6})
                ]
            }

            case "company": {
                return [
                    body("identity").isString(),
                    body("name").isString(),
                    body("website").isString(),
                    body("plan").isString()
                ]
            }
        }
    },

    registerUser: async (req, res, next) => {
        const {
                first_name, 
                last_name, 
                display_name, 
                email, 
                phone_number,
                user_role,
                password
        } = req.body
            //get instance of user
            const user = new UserModel({})
            user.local.first_name = first_name
            user.local.last_name = last_name
            user.local.display_name = display_name
            user.local.email = email
            user.local.phone_number = phone_number
            user.local.password = password
            user.local.user_role = user_role || "admin"
            user.identifier = email //Util.encryptor(email)

            user.local.password = await bcrypt.hash(user.local.password, 10)

            //check if user already exists
            UserModel.findOne({identifier: user.identifier})
            .then(userExists => {
                if (userExists) {
                    return res.status(409).json({
                        success: false,
                        message: "User already exists",
                        error: {
                            statusCode: 409,
                            description: "Email is already taken"
                        }
                    })
                } else {
                    //save new user to db
                    user.save()
                    .then(result => {
                        //send welcome message to user here...
                        let mailOptions = {
                            to: result.local.email,
                            from: _config.sender.admin,
                            subject: "Registration Successful"
                        }
                        sendMail(mailOptions, 'welcome', result, (state) => {
                            if (state.id) {
                                return res.status(201).json({
                                    success: true,
                                    message: "New User Created",
                                    data: {
                                        statusCode: 201,
                                        user: result
                                    }
                                })
                            } else {
                                return res.status(503).json({
                                    success: false,
                                    message: "Email Service Unavailable",
                                    error: {
                                        statusCode: 503,
                                        description: "Email Service Unavailable"
                                    }
                                })
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(500).json({
                            success: false,
                            message: "Server Error",
                            error: {
                                statusCode: 500,
                                dsecription: "Server Error"
                            }
                        })
                    })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    message: "Internal Error",
                    error: {
                        statusCode: 500,
                        dsecription: "Internal Error"
                    }
                })
            })
    },

    userUpdate: async (req, res) => {
        const id = req.body.identity

        const company = await PlatformModel.findOne({user: id})
        if (!company) {
            const platform = new PlatformModel({})
            platform.user = req.body.identity
            platform.company.name = req.body.name
            platform.company.address = req.body.address
            platform.company.sector = req.body.sector
            platform.company.state = req.body.state
            platform.company.country = req.body.country
            platform.company.plan = req.body.plan
            platform.company.website = req.body.website
            platform.company.description = req.body.description
            platform.company.logo = req.body.logo

            const user = await UserModel.findOne({_id:id})
            platform.save()
            .then(result => {
                //set user status to active here...
                const mailOption = {
                    to:user.local.email,
                    from:_config.sender.admin,
                    subject:"Registration Confirmation"
                }
                sendMail(mailOption, 'welcome', user, (msg) => {
                    if (msg.id) {
                        return res.status(201).json({
                            success: true,
                            message: "User update successful",
                            data: {
                                statusCode: 201,
                                user:user
                            }
                        })
                    } else {
                        return res.status(503).json({
                            success:false,
                            message:"email service unavailable"
                        })
                    }
                })
            })
            .catch(err => {

            })
        } else {
            return res.status(400).json({
                success: false,
                message:"Expired Link",
                error: {
                    statusCode: 400,
                    description: "Expired Link"
                }
            })
        }
    }
}

module.exports = RegisterInit