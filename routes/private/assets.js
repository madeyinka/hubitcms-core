const express = require('express')
const router = express.Router()
const MediaModel = require('../../model/media')
const cloudinary = require('../../libraries/Uploader')
const auth = require('../../middlewares/auth')

router.post('/upload-to-cloud', auth, async (req, res) => {
    try {
        await cloudinary.uploader.upload(req.body.data, {
            upload_preset: "dev_mode",
        })
        .then(response => {
            const media = new MediaModel({})
            media.id = response.asset_id
            media.public_id = response.public_id
            media.type = response.resource_type
            media.format = response.format
            media.size = response.size
            media.url = response.url,
            media.secure_url = response.secure_url
            media.width = response.width
            media.user = req.user.id
            media.save()
            .then(result => {
                return res.status(201).json({
                    success:true,
                    message:"sucess",
                    url:result.url
                })
            })
            .catch(err => {
                res.status(500).json({
                    success:false,
                    message:"Fail to upload"
                })
            })
        })
    } catch(err) {
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
    
})


module.exports = router