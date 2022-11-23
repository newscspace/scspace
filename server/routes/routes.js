const express = require('express');
const router = express.Router();
const reservation = require('./reservation');
const notice = require('./notice');
const faq = require('./faq');
const ask = require('./ask');
const jwt = require('./jwt');
const team = require('./team');
const space = require('./space');
const users = require('./users');
const easteregg = require('./easteregg');
//const event = require('./event');



router.post('/api/reservation/*', reservation.router);
router.get('/api/reservation/*', reservation.router);

router.get('/api/notice/*', notice.router);
router.post('/api/notice/*', notice.router);

router.get('/api/faq/*', faq.router);
router.post('/api/faq/*', faq.router);

router.get('/api/ask/*', ask.router);
router.post('/api/ask/*', ask.router);

router.get('/api/jwt/*', jwt.router);
router.post('/api/jwt/*', jwt.router);

router.post('/api/team/*', team.router);
router.get('/api/team/*', team.router);

router.post('/api/space/*', space.router);
router.get('/api/space/*', space.router);

router.get('/api/users/*', users.router);
router.post('/api/users/*', users.router);

router.get('api/easteregg/*', easteregg.router);

//router.get('/api/event/*', event.router);
//router.post('/api/event/*', event.router);

// router.get('/*', (req, res) => {res.send(express.static('../../scspace/build/index.html'))});
router.get('*', (req, res) => {
    res.redirect('https://scspace.kaist.ac.kr/');
})



module.exports = {router};
