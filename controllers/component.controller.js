const PlatformModel = require('../model/platform')

const ComponentInit = {

    createComponent: async (req, res) => {
        const id = req.user.id
        try {
            const platform = await PlatformModel.findOne({user:id})
            if (platform) {
                platform.components.push({
                    id:req.body.id,
                    label:req.body.label,
                    slug:req.body.slug,
                    description:req.body.description,
                    tags:req.body.tags
                })
                platform.save()
                .then(component => {
                    return res.status(201).json({
                        success: true,
                        message: "success",
                        data: {
                            statusCode:201,
                            response:component
                        }
                    })
                })
                .catch(err => {
                    res.send(err)
                })
            }
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:error.message,
                error:{}
            })
        }
    },

    getAllComponents: async (req, res) => {
        const id = req.user.id
        try {
            const platform = await PlatformModel.findOne({user:id})
            if (!platform) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                    error: {
                        statusCode: 404,
                        description: "User not found"
                    }
                })
            } else {
                let components = platform.components
                return res.status(200).json({
                    success:true,
                    message:"Data found",
                    result:components.length,
                    data: {
                        statusCode:200,
                        components
                    }
                })
            }
        } catch(e) {
            return res.status(500).json({
                success:false,
                message:e.message,
                error:{}
            })
        }
    },

    updateComponent: async (req, res) => {
        const id = req.user.id
        const comp_id = req.body.id
        const platform = await PlatformModel.findOne({user:id})
        if (platform) {
            const components = platform.components
            components.forEach(component => {
                if (component.id === comp_id) {
                    component.label = req.body.label,
                    component.slug = req.body.slug,
                    component.description = req.body.description,
                    component.tags = req.body.tags
                    platform.save()
                    .then(result => {
                        return res.status(201).json({
                            success:true,
                            message:"Component update successful",
                            data: {
                                statusCode:201,
                                response:result
                            }
                        })
                    })
                    .catch(err => {
                        res.status(401).json({
                            success:false,
                            message:"Fail to update component",
                            error:{
                                statusCode:401,
                                message:err.message
                            }
                        })
                    })
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message:"User not found",
                error: {
                    statusCode: 404,
                    description:"User not found"
                }
            })
        }
    },

    deleteComponent: async (req, res) => {
        
    }
}

module.exports = ComponentInit