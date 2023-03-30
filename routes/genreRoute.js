const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genreModel');
const { auth } = require('../middleware/auth');
const admin = require('../middleware/admin')

router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });
  const result = await genre.save();
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  res.send(genre);
});

router.delete('/:id', [auth, admin],async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  res.send(genre);
});

module.exports = router;
