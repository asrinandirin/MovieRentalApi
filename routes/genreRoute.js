const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genreModel');

router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.post('/', async (req, res) => {
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
  res.send(genre)
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    
    res.send(genre);
  });

module.exports = router;
