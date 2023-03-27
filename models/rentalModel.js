const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi)
const { customerSchema } = require('./customerModel');
const { movieSchema } = require('./movieModel');

const rentalSchema = new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                maxlength: 30
            },
            isGold:{
                type: Boolean,
                default: false
            },
            phone:{
                type: Number,
                required: true,
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                maxlength: 255
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                min: 0
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type: Date
    },
    rentalFee:{
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rentals', rentalSchema)

const validateRental = (rental) => {
    const schema = Joi.object({
        customerID: Joi.objectid().required(),
        movieID: Joi.objectid().required()
    })

    return schema.validate(rental)
}

exports.validateRental = validateRental
exports.Rental = Rental
exports.rentalSchema = rentalSchema
