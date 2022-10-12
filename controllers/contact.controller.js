const ContactModel = require("../model/contact")

const ContactInit = {
    createUnit: async (req, res) => {
        const id = req.user.id
        try {
            const contact = await ContactModel.findOne({user:id})
            if (!contact) {
                const unit = new ContactModel({})
                unit.user = req.user.id
                unit.units.push({
                    id:req.body.id,
                    name:req.body.name,
                    slug:req.body.slug,
                    email:req.body.email,
                    status:req.body.status
                })
                unit.save()
                .then(units => {
                    return res.status(201).json({
                        success:true,
                        message:"Success",
                        data: {
                            statusCode:201,
                            response:units
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
                contact.units.push({
                    id:req.body.id,
                    name:req.body.name,
                    slug:req.body.slug,
                    email:req.body.email,
                    status:req.body.status
                })
                contact.save()
                .then(units => {
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data:{
                            statusCode:201,
                            response:units
                        }
                    })        
                })
            }
        } catch(error) {
            return res.status(400).json({
                success:false,
                message:error.message,
                error:{}
            })
        }
    },

    getUnits: async (req, res) => {
        const id = req.user.id
        try {
            const contact = await ContactModel.findOne({user:id})
            if (!contact) {
                return res.status(404).json({
                    success:false,
                    message:"User does not exist.",
                    error:{
                        statusCode:404,
                        description:"User does not exist."
                    }
                })
            } else {
                const units = contact.units
                return res.status(200).json({
                    success:true,
                    message:"Data found",
                    data: {
                        statusCode:200,
                        units
                    }
                })
            }
        } catch(error) {
            return res.status(400).json({
                success:false,
                message:error.message,
                error:{}
            })
        }
    },

    getMessages: async (req, res) => {
        const id = req.user.id
        try {
            const contacts = await ContactModel.findOne({user:id})
            if (!contacts) {
                return res.status(404).json({
                    success:false,
                    message:"User does not exist",
                    error:{}
                })
            } else {
                let messages = contacts.messages
                return res.status(200).json({
                    success:true,
                    message:"data found",
                    data:{
                        statusCode:200,
                        messages
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
    }, 

    update: async (req, res) => {
        const user = req.user.id
        try {
            const contact = await ContactModel.findOne({user:user})
            if (!contact) {
                return res.status(404).json({
                    success:false,
                    message:"User does not exist",
                    error:{}
                })
            } else {
                const messages = contact.messages
                let message = messages.find((message) => message.id === req.body.id)
                if (req.body.closed)message.closed = req.body.closed
                if (req.body.marked)message.marked = req.body.marked
                contact.save()
                .then(() => {
                    return res.status(201).json({
                        success:true,
                        message:"update successful",
                        data:{
                            statusCode:201,
                            message:contact.messages
                        }
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        success:false,
                        message:err.message,
                        error:{
                            statusCode:500,
                            description:err.message
                        }
                    })
                })
            }
        } catch(err) {
            res.status(500).json({
                success:false,
                message:err.message,
                error:{
                    statusCode:500,
                    description:err.message
                }
            })
        }
    }
}

module.exports = ContactInit