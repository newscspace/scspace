const express = require('express');
const router = express.Router();
const reservation = require('../controllers/Reservation');


router.get('/api/reservation/all', reservation.readAll);

router.post('/api/reservation/create',reservation.create);

router.post('/api/reservation/comment/create', reservation.createComment);

router.get('/api/reservation/mine', reservation.readMine);

router.get('/api/reservation/id', reservation.readId);

router.post('/api/reservation/update', reservation.update);

router.get('/api/reservation/delete', reservation.delete);

router.get('/api/reservation/latest', reservation.latestRead);

router.get('/api/reservation/calendar/read', reservation.readCalendar);

router.post('/api/reservation/calendar/create', reservation.createCalendar);

router.post('/api/reservation/calendar/update', reservation.updateCalendar)

module.exports = {router};




