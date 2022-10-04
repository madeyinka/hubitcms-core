const ContentModel = require('../model/content')

const serviceInit = {
    createService: async (req, res) => {
        const id = req.user.id, service_id = req.body.id
        try {
            const content = await ContentModel.findOne({})
            if (!content) {
                const service = new ContentModel({})
                service.user = id
                service.services.push({
                    id: req.body.id,
                    label: req.body.label,
                    slug:  req.body.slug,
                    parent: req.body.parent,
                    icon: req.body.icon,
                    image: req.body.image,
                    description: req.body.description,
                    status: req.body.status
                })
                service.save()
                .then((services) => {
                    return res.status(200).json({
                        success:true,
                        message:"Successful",
                        data: {
                            statusCode:200,
                            response:services
                        }
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        success:false,
                        message:err.message,
                        error: {
                            statusCode:500,
                            description:err.message
                        }
                    })
                })
            } else {
                content.services.push({
                    id:service_id,
                    label:req.body.label,
                    slug:req.body.slug,
                    parent:req.body.parent,
                    icon:req.body.icon,
                    image:req.body.image,
                    description:req.body.description,
                    status:req.body.status
                })
                content.save()
                .then((services) => {
                    return res.status(200).json({
                        success:true,
                        message:"Successful",
                        data: {
                            statusCode:200,
                            response:services
                        }
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        success:false,
                        message:err.message,
                        error: {
                            statusCode:500,
                            description:err.message
                        }
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

    updateService: async (req, res) => {
        const id = req.user.id, service_id = req.body.id
        try {
            const content = await ContentModel.findOne({user:id})
            //console.log(content)
            if (content) {
                const services = content.services
                services.forEach(service => {
                    if (service.id === service_id) {
                        service.label = req.body.label
                        service.slug = req.body.slug
                        service.parent = req.body.parent
                        service.icon = req.body.icon
                        service.image = req.body.image
                        service.description = req.body.description
                        service.status = req.body.status
                        service.date_modified = req.body.date_modified
                        content.save()
                        .then((services) => {
                            return res.status(200).json({
                                success:true,
                                message:"Update Successful",
                                data: {
                                    statusCode:200,
                                    response: services
                                }
                            })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                success:false,
                                message:err.message,
                                error:{}
                            })
                        })
                    }
                })
            } else {
                return res.status(404).json({
                    success:false,
                    message:"Content not found.",
                    error:{
                        statusCode:404,
                        description:"Content not found."
                    }
                })
            }
        } catch (err) {
            res.status(400).json({
                success:false,
                message:error.message,
                error:{}
            })
        }
    },

    getAllServices: async (req, res) => {
        const id = req.user.id
        try {
            const content = await ContentModel.findOne({user:id})
            if(!content) {
                return res.status(404).json({
                    success:false,
                    message:"Content not found.",
                    error:{
                        statusCode:404,
                        description:"Content not found."
                    }
                })
            } else {
                const services = content.services
                return res.status(200).json({
                    success:true,
                    message:"data found",
                    data:{
                        statusCode:200,
                        response:services
                    }
                })
            }
        } catch(err) {
            res.status(400).json({
                success:false,
                message:err.message,
                error:{}
            })
        }
    }
}

module.exports = serviceInit