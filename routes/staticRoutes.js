const express = require('express');
const staticroute = express.Router();
const URL = require('../models/url');

staticroute.get('/', (req,res) => {
  return res.render('signup')
});

staticroute.get('/login', (req,res) => {
  return res.render('login')
});
  
module.exports = staticroute;
