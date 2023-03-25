const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genreModel');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate:{
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
})

const Movie = mongoose.model('Movies', movieSchema)

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genreID: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });
  return schema.validate(movie);
};

exports.validateMovie = validateMovie
exports.Movie = Movie
exports.movieSchema = movieSchema
