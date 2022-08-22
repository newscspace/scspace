const express = require('express');
const router = express.Router();
const reservation = require('../controllers/Reservation');


router.get('/api/reservation/all', reservation.read);

router.post('/api/reservation/create',reservation.create);

router.get('/api/reservation/mine', reservation.readMine);

router.get('/api/reservation/id', reservation.readId);

router.post('/api/reservation/update', reservation.update);

router.get('/api/reservation/delete', reservation.delete);

router.get('/api/reservation/latest', reservation.latestRead);

module.exports = {router};




