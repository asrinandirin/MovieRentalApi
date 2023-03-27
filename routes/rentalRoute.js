const mongoose = require('mongoose');
const { Rental, validateRental } = require('../models/rentalModel');
const express = require('express');
const { Movie } = require('../models/movieModel');
const { Customer } = require('../models/customerModel');
const router = express.Router();
/* const Fawn = require('fawn')
Fawn.init("mongodb://localhost:27017/MovieShop")
const task = Fawn.Task() */

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if(!mongoose.Types.ObjectId.isValid(req.body.customerID)){
    return res.status(400).send('Invalid Customer')
  }

  const movie = await Movie.findById(req.body.movieID);
  const customer = await Customer.findById(req.body.customerID);

  if (movie.numberInStock === 0) {
    return res.status(400).send('No movie for now...');
  }

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre.name,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  /* task.save("rentals", rental).run() */

  const result = await rental.save();
  movie.numberInStock--;
  movie.save();
});

module.exports = router;
