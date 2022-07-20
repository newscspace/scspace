const express = require('express');
const router = express.Router();
const reservation = require('../controllers/Reservation');

router.post('/api/reservation/create',reservation.create);

// router.post('/api/reservation/update', reservation.update);

// router.post('/api/reservation/read', reservation.read);

//router.post('/api/reservation/delete', reservation.delete);

module.exports = {router};




