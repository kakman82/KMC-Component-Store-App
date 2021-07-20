const express = require('express');
const router = express.Router();

router.get('/email', (req, res) => {
  res.send('Email Test Page');
});

router.get('/email/welcome', (req, res) => {
  res.render('email/welcome');
});

module.exports = router;
