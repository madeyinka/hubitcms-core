const ContentModel = require('../model/content')

const PostInit = {
    createPost: async (req, res) => {
        const id = req.user.id
        if (!req.body.category.value) {
            return res.status(400).json({
                success:false,
                message:"Post should be associated to atleast one category",
                error:{
                    statusCode:400,
                    description:"Post should be associated to atleast one category"
                }
            })
        }
        try {
            const content = await ContentModel.findOne({user:id})
            if (content) {
                let param = req.body
                content.posts.push(param)
                content.save()
                .then(resp => {
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data:{
                            statusCode:201,
                            posts:resp.posts
                        }
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        success:false,
                        message:err.message
                    })
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
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:error.message,
                error:{}
            })
        }
    },

    updatePost: async (req, res) => {
        const id = req.user.id, post_id = req.body.id 
        try {
            const content = await ContentModel.findOne({user:id})
            if (content) {
                content.posts = req.body
                content.save()
                .then(resp => {
                    return res.status(201).json({
                        success:true,
                        message:"update successful",
                        data: {
                            statusCode:201,
                            posts:resp.posts
                        }
                    })
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
        } catch(error) {
            res.status(400).json({
                success:false,
                message:error.message,
                error:{}
            })
        }
    },

    getAllPosts: async (req, res) => {
        const id = req.user.id
        try {
            const content = await ContentModel.findOne({user:id})
            if (!content) {
                return res.status(404).json({
                    success:false,
                    message:"Content not found.",
                    error:{
                        statusCode:404,
                        description:"Content not found."
                    }
                })
            } else {
                const posts = content.posts
                return res.status(200).json({
                    success:true,
                    message:"Data found",
                    data: {
                        statusCode:200,
                        posts
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
    }
}

module.exports = PostInit