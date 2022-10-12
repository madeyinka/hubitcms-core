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

    updatePost: (req, res) => {
        const id = req.user.id, post_id = req.body.id 
            
        ContentModel.findOne({user:id})
        .then (content => {
            const posts = content.posts
            let post = posts.find(post => post.id === post_id)
            
            if (!post) {
                return res.status(404).json({
                    success:false,
                    message:"Post not found",
                    error:{
                        statusCode:404,
                        description:"Post not found"
                    }
                })
            }

            post.title = req.body.title
            post.category = req.body.category
            post.type = req.body.type
            post.short_content = req.body.short_content
            post.content = req.body.content
            post.author = req.body.author
            post.keywords = req.body.keywords
            post.image = req.body.image
            post.status = req.body.status
            post.pub_date = req.body.pub_date
            post.date_modified = req.body.date_modified
            post.seo.title = req.body.seo.title
            post.seo.keywords = req.body.seo.keywords
            post.seo.description = req.body.seo.description
            post.post_settings.featured = req.body.post_settings.featured
            post.post_settings.slider = req.body.post_settings.slider
            post.post_settings.popular = req.body.post_settings.popular
            post.post_settings.editor = req.body.post_settings.editor
            post.post_settings.facebook = req.body.post_settings.facebook

            content.save()
            .then(() => {
                return res.status(200).json({
                    success:true,
                    message:"Post update successful",
                    data: {
                        statusCode:200,
                        post: content.posts.find(post => post.id === post_id)
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    success:false,
                    message:err.message,
                    error:{
                        statusCode:500,
                        description:err.message
                    }
                })
            })
        })
        .catch (err => {
            res.status(500).json({
                succcess:false,
                messsage:err.message,
                error: {
                    statusCode:500,
                    description:err.message
                }
            })
        })
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
    },

    deletePost: async (req, res) => {
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
                let posts = content.posts
                posts.forEach((post, index) => {
                    if (post.id === id) {
                        posts.splice(index, 1)
                    }
                })
                content.save()
                .then(() => {
                    return res.status(200).json({
                        success:true,
                        message:"Item successfully deleted",
                        data:{
                            statusCode:200,
                            posts
                        }
                    })
                })
            }
        } catch (err) {
            res.status(500).json({
                success:false,
                message:err.message || "Error Encountered",
                error:{}
            })
        }
    },

    //Author Controllers
    createAuthor: async (req, res) => {
        const id = req.user.id
        try {
            const content = await ContentModel.findOne({user:id})
            if (!content) {
                const author = new ContentModel({})
                author.user = req.user.id
                author.post_authors.push({
                    id: req.body.id,
                    name:req.body.name,
                    slug:req.body.slug,
                    profile:req.body.profile,
                    image:req.body.image
                })
                author.save()
                .then(author => {
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data: {
                            statusCode:201,
                            response:author
                        }
                    })
                })
            } else {
                content.post_authors.push({
                    id:req.body.id,
                    name:req.body.name,
                    slug:req.body.slug,
                    profile:req.body.profile,
                    image:req.body.image
                })
                content.save()
                .then(author => {
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data:{
                            statusCode:201,
                            response:author
                        }
                    })
                })
            }
        } catch (err) {
            return res.status(400).json({
                success:false,
                message:err.message,
                error:{}
            })
        }
    },

    updateAuthor: async (req, res) => {
        const id = req.user.id, author_id = req.body.id
        try {
            const content = await ContentModel.findOne({user:id})
            if (content) {
                const authors = content.post_authors
                authors.forEach(author => {
                    if (author.id === author_id) {
                        author.name = req.body.name
                        author.slug = req.body.slug
                        author.image = req.body.image
                        author.profile = req.body.profile
                        author.date_modified = Date.now()
                        content.save()
                        .then(author => {
                            return res.status(201).json({
                                success:true,
                                message:"Update Successful",
                                data: {
                                    statusCode:201,
                                    response:author
                                }
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
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:error.message,
                error:{}
            })
        }
    },
    
    getAllAuthors: async (req, res) => {
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
                const authors = content.post_authors
                return res.status(200).json({
                    success:true,
                    message:"Data found",
                    data: {
                        statusCode:200,
                        response:authors
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
    }
}

module.exports = PostInit