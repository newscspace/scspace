const express = require('express');
const router = express.Router();
const reservation = require('./reservation');


router.post('/api/reservation/*', reservation.router);



module.exports = {router};
