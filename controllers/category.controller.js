const ContentModel = require("../model/content")

const CategoryInit = {
    createCategory: async (req, res) => {
        const id = req.user.id
        try {
            const content = await ContentModel.findOne({user:id})
            if (!content) {
                const category = new ContentModel({})
                category.user = req.user.id
                category.categories.push({
                    id:req.body.id,
                    label:req.body.label,
                    slug:req.body.slug,
                    parent:req.body.parent,
                    image:req.body.image,
                    description:req.body.description
                })
                category.save()
                .then(category => {
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data: {
                            statusCode:201,
                            response:category
                        }
                    })
                })
            } else {
                content.categories.push({
                    id:req.body.id,
                    label:req.body.label,
                    slug:req.body.slug,
                    parent:req.body.parent,
                    image:req.body.image,
                    description:req.body.description
                })
                //save content and return
                content.save()
                .then(category => {
                    return res.status(201).json({
                        success:true,
                        message:"success",
                        data: {
                            statusCode:201,
                            response:category
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

    updateCategory: async (req, res) => {
        const id = req.user.id, category_id = req.body.id
        try {
            const content = await ContentModel.findOne({user:id})
            if (content) {
                const categories = content.categories
                categories.forEach(category => {
                    if (category.id === category_id) {
                        category.label = req.body.label
                        category.slug = req.body.slug
                        category.parent = req.body.parent
                        category.description = req.body.description
                        category.image = req.body.image
                        category.date_modified = Date.now()
                        content.save()
                        .then(category => {
                            return res.status(201).json({
                                success:true,
                                message:"Update Successful",
                                data:{
                                    statusCode:201,
                                    response:category
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

    getAllCategories: async (req, res) => {
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
                const categories = content.categories
                return res.status(200).json({
                    success:true,
                    message:"Data found.",
                    data: {
                        statusCode:200,
                        categories
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

module.exports = CategoryInit