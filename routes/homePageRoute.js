const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('App Version v1');
});

module.exports = router
