const express = require('express');
const router = express.Router();
const event = require('../controllers/Event');

router.get('/api/event/all', event.read_all);

router.get('/api/event/id', event.read_id);


router.post('/api/event/create', event.create);

router.post('/api/event/update', event.update);

router.get('/api/event/delete', event.delete);

module.exports = {router};