const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        maxlength: 30
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true,
        maxlength: 20
    }
})

const Customer = mongoose.model('Customers', customerSchema)

const validateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string().max(20).required(),
        phone: Joi.number().required()
    })

    return schema.validate(customer)
}

const validateCustomerMembership = (customer) => {
    const schema = Joi.object({
        name: Joi.string().max(20).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean().required()
    })

    return schema.validate(customer)
}

exports.validateCustomerMembership = validateCustomerMembership
exports.validateCustomer = validateCustomer
exports.Customer = Customer
exports.customerSchema = customerSchema