const express = require('express');
const router = express.Router();
const ask = require('../controllers/Ask');





router.get('/api/ask/all', ask.readAll);

router.get('/api/ask/id', ask.readId);

router.get('/api/ask/mine', ask.readMine);

router.post('/api/ask/create',ask.create);

router.get('/api/ask/delete', ask.delete);

module.exports = {router};




