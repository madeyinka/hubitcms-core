const SettingsModel = require('./../model/settings')
const UserModel = require('./../model/admin_user')

const settingsInit = {
    configUpdate: async (req, res) => {
        const id = req.user.id
        const {fb_page_url, fb_page_id, fb_app_id, fb_app_secret} = req.body

       //get instance of user
       const foundUser = await UserModel.findOne({_id:id})
       if (!foundUser) {
        return res.status(401).json({
            success: false,
            message: "User authorization is required",
            error: {
                statusCode: 401,
                description: "User authorization is required"
            }
        })
       }

       //check if instance of user setting exists already
       const settingInstance = await SettingsModel.findOne({user: foundUser._id})
       if (!settingInstance) {
            const settings = new SettingsModel({})
            settings.user = foundUser._id 
            settings.config.fb_page_url = fb_page_url
            settings.config.fb_page_id = fb_page_id
            settings.config.fb_app_id = fb_app_id
            settings.config.fb_app_secret = fb_app_secret
            settings.save()
            .then(result => {
                return res.status(201).json({
                    success:true,
                    message: "Configuration saved",
                    data: result
                })          
            })
            .catch(err => {
                return res.status(400).json({
                    success:false,
                    message: "Could not save changes",
                    error:{
                        statusCode: 400,
                        description: "Could not update"
                    }
                })
            })
       } else {
            if (fb_page_url)settingInstance.config.fb_page_url = fb_page_url
            if (fb_page_id)settingInstance.config.fb_page_id = fb_page_id
            if (fb_app_id)settingInstance.config.fb_app_id = fb_app_id
            if (fb_app_secret)settingInstance.config.fb_app_secret = fb_app_secret
            settingInstance.save()
            .then(result => {
                return res.status(201).json({
                    success: true,
                    message: "Configuration Settings Updated",
                    data: result
                })
            })
            .catch(err => {
                return res.status(400).json({
                    success: false,
                    message: "Could not update",
                    error:{
                        statusCode: 400,
                        description: "Could not update"
                    }
                })
            })
       }
    },

    //return current user settings data
    getAllSettings: async (req, res) => {
        const id = req.user.id

        const currUser = await UserModel.findOne({_id:id})
        if (!currUser) {
            return res.status(401).json({
                success:false,
                message: "User authorization is required",
                error: {
                    statusCode: 401,
                    description: "User authorization is required"
                }
            })
        } else {
            const settings = await SettingsModel.findOne({user:currUser._id})
            if (!settings) {
                return res.status(404).json({
                    success: false,
                    message: "Data not found",
                    error: {
                        statusCode: 404,
                        description: "Data not found"
                    }
                })
            } else {
                return res.status(201).json({
                    success: true,
                    message: "Data found",
                    data: settings
                })
            }
        }

        
    }
}

module.exports = settingsInit