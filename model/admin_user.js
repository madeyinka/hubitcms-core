const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const adminUserSchema = new mongoose.Schema(
    {
        identifier:{type:String, unique:true},
        local: {
            first_name:{type:String, default:""},
            last_name:{type:String, default:""},
            display_name:{type:String, default:"Not Set"},
            email:{type:String, unique:true, default:""},
            phone_number:{type:String},
            user_role:{type:String, enum:["user", "admin", "super_admin"]},
            password:{type:String},
            is_active:{type:Boolean, default:0}
        },
        google:{
            //configure google auth
        },
        facebook:{
            //configure facebook auth
        },
        resetPasswordToken:{type: String, required: false},
        resetPasswordExpires:{type: String, required: false},
        api_token:{type:String},
        image:{
            type:String,
            default:"https://res.cloudinary.com/hubitdev/image/upload/v1656572289/user-default_lncnwj.png"
        }
    },{timestamps:true}
)


// adminUserSchema.pre('save', function(next){
//     const user = this

//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err)

//         bcrypt.hash(user.password, salt, (err, hashed) => {
//             if (err) return next(err)

//             user.password = hashed
//             next()
//         })
//     })
// })

// adminUserSchema.methods.comparePassword = (password) => {
//     return bcrypt.compareSync(password, this.password)
// }

// adminUserSchema.methods.generatePasswordReset = () => {
//     this.resetPasswordToken = crypto.randomBytes(6).toString("hex");
//     this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
// }

module.exports = mongoose.model("admin_user", adminUserSchema)