const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../models/userModel');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

router.get('/', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password)

  if(!validPassword) return res.status(400).send('Invalid email or password')

  const token = jwt.sign({_id: user._id, name: user.name}, config.get('jwtPrivateKey') )

  res.send(token)
});

const validateUser = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(req)

}

module.exports = router;
