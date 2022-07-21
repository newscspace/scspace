const express = require('express');
const router = express.Router();
const reservation = require('../controllers/Reservation');


router.get('/api/reservation', reservation.read);

router.post('/api/reservation/create',reservation.create);

router.post('/api/reservation/update', reservation.update);

router.get('/api/reservation/delete', reservation.delete);

module.exports = {router};




