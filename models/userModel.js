const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectid = require('joi-objectid')(Joi)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('Users', userSchema)

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })

    return schema.validate(user)
}

exports.User = User
exports.validateUser = validateUser
