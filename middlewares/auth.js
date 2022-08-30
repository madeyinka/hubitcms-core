const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) res.status(403).send("Forbidden for Non Authorized User")

    const token = authHeader && authHeader.replace("Bearer", "").trim()

    if (!token) {
        return res.status(403).json({
            success:false,
            message:"Token is required",
            error: {
                statusCode: 403,
                auth: false,
                description:"You must provide token for validation"
            }
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success:false,
                message:"Invalid Token",
                error: {
                    statusCode: 403,
                    auth: false,
                    description:"Token is not valid"
                }
            })
        }
        req.user = decoded
        next()
    })
}

module.exports = verifyToken