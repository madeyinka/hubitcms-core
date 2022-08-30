const User = require('../model/admin_user')

const UserInit = {
    getSingleUser: async (req, res) => {
        const identity = req.params.identity

        //check if user exists, get company information get setting info
        const foundUser = await User.findOne({_id:req.user.id})
        if (!foundUser) {
            return res.status(404).json({
                success:false,
                message:"User not found",
                error: {
                    statusCode: 404,
                    description: "User not found"
                }
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Found.",
            data: foundUser
        })
    },

    updateSingleUser: async (req, res) => {
        const id = req.user.id
        const {first_name, last_name, display_name, phone_number, address, state, country} = req.body

        const user = await User.findOne({_id:id})
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    statusCode: 404,
                    description:"User not found"
                }
            })
        }
        //get user in requset body
        if (first_name)user.local.first_name = first_name
        if (last_name)user.local.last_name = last_name
        if (display_name)user.local.display_name = display_name
        if (phone_number) user.local.phone_number = phone_number
        if (address) user.address = address
        if (country)user.country = country
        if (state)user.state = state

        //save user to db
        user.save()
        .then((updatedUser) => {
            if (updatedUser) {
                return res.status(201).json({
                    success: true,
                    message: "User updated",
                    data: updatedUser
                })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success: false,
                message: "Error updating user",
                error: {
                    statusCode: 400,
                    description: "Error updating user"
                }
            })
        }) 
    }
}

module.exports = UserInit

 //password change: old_password, new_password, confirm_new_password