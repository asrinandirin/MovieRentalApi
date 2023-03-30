const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/userModel');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('config')
const { auth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

// /api/users/me
router.get('/me',auth, async (req,res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
} )

// Register new user
router.post('/', async (req, res) => {
  //Request validation
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Email check if it is exist
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');
  //Register new user
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  //Token creation
  const token = user.generateAuthToken()

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  
});

module.exports = router;
