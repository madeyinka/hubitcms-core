const ContactModel = require('../../model/contact')

const ContactInit = {
    postMessage: async (req, res) => {
        const id = req.query.user
        try {
            const user = await ContactModel.findOne({user:id})
            if (!user) {
                return res.status(404).json({
                    success:false,
                    message:"Something went wrong. possibly no unit assigned",
                    error:{}
                })
            } else {
                user.messages.push({
                    id:req.body.id,
                    title:req.body.title,
                    name:req.body.name,
                    unit:req.body.unit,
                    message:req.body.message,
                    theme:req.body.theme,
                    closed:req.body.closed,
                    marked:req.body.marked
                })
                user.save()
                .then(resp => { //send contact message to appropiate unit...
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data:{
                            statusCode:201,
                            response:resp.messages
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
        } catch(err) {
            res.status(400).json({
                success:false,
                message:err.message,
                error:{}
            })
        }
    }
}

module.exports = ContactInit