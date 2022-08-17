const express = require('express');
const router = express.Router();
const ask = require('../controllers/Ask');





router.get('/api/ask/all', ask.readAll);

router.get('/api/ask/id', ask.readId);

router.get('/api/ask/mine', ask.readMine);

router.get('/api/ask/comment/id', ask.readComment);

router.post('/api/ask/comment/create', ask.createComment);

router.post('/api/ask/create',ask.create);

router.get('/api/ask/delete', ask.delete);

router.get('/api/ask/latest', ask.latestRead);

module.exports = {router};




