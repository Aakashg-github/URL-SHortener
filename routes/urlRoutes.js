const express = require('express');
const { generateShortURL, handleGetAnalytics, showURL, gotoURL } = require('../contrllers/urlControllers');
const urlroute = express.Router();

urlroute.get('/home',showURL);
urlroute.post('/',generateShortURL);
urlroute.get('/analytics/:ShortId',handleGetAnalytics);
urlroute.get('/:ShortId', gotoURL);
// app.get('/url/:ShortId', );

module.exports = urlroute;