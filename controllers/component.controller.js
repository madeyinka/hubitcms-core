const ContentModel = require('../model/content')

const ComponentInit = {

    createComponent: async (req, res) => {
        const id = req.user.id
        try {
            const content = await ContentModel.findOne({user:id})
            if (!content) {
                const component = new ContentModel({})
                component.user = req.user.id
                component.components.push({
                    id:req.body.id,
                    label:req.body.label,
                    slug:req.body.slug,
                    description:req.body.description,
                    tags:req.body.tags
                })
                component.save()
                .then(result => {
                    console.log(result.data)
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data: {
                            statusCode:201,
                            response:result
                        }
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        success:false,
                        message:err.message,
                        error:{}
                    })
                })
            } else {
                content.components.push({
                   id:req.body.id,
                   label:req.body.label,
                   slug:req.body.slug,
                   description:req.body.description,
                   tags:req.body.tags
                })
                content.save()
                .then(result => {
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data:{
                            statusCode:201,
                            response:result
                        }
                    })

                })
                .catch(err => {
                    res.status(400).json({
                        success:false,
                        message:err.message,
                        error:{}
                    })
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
            const content = await ContentModel.findOne({user:id})
            if (!content) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                    error: {
                        statusCode: 404,
                        description: "User not found"
                    }
                })
            } else {
                let components = content.components
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
        const content = await ContentModel.findOne({user:id})
        if (content) {
            const components = content.components
            components.forEach(component => {
                if (component.id === comp_id) {
                    component.label = req.body.label,
                    component.slug = req.body.slug,
                    component.description = req.body.description,
                    component.tags = req.body.tags
                    component.date_modified = Date.now()
                    content.save()
                    .then(result => {
                        //console.log(result.data)
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
        const user = req.user.id, id = req.query.identity
        try {
            const content = await ContentModel.findOne({user:user})
            if (!content) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                    error: {
                        statusCode: 404,
                        description: "User not found"
                    }
                })
            } else {
                let components = content.components
                components.forEach((component, index) => {
                    if (component.id === id) {
                        components.splice(index, 1)
                    }
                })
                content.save()
                .then(() => {
                    return res.status(200).json({
                        success:true,
                        message:"Item successfully deleted",
                        data:{
                            statusCode:200,
                            components
                        }
                    })
                })
            }
        } catch(err) {
            res.status(500).json({
                success:false,
                message:err.message || "Error Encountered",
                error:{}
            })
        }
    }
}

module.exports = ComponentInit