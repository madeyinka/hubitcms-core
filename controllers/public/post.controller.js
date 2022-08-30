const ContentModel = require('../../model/content')

const PostInit = {
    getPosts: async (req, res) => {
        const user = req.query.user
        try {
            const content = await ContentModel.findOne({user:user})
            if (!content) {
                return res.status(404).json({
                    success:false,
                    message:"content not found",
                    error:{
                        statusCode:404,
                        description:"Content not found."
                    }
                })
            } else {
                return res.status(200).json({
                    success:true,
                    message:"Data found",
                    data: {
                        statusCode:200,
                        posts: content.posts
                    }
                })
            }
        } catch (err) {
            return res.status(400).json({
                success:false,
                message:err.message,
                error:{}
            })
        }
    }
}

module.exports = PostInit