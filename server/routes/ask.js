const express = require('express');
const router = express.Router();
const ask = require('../controllers/Ask');





router.get('/api/ask/all', ask.read_all);

router.get('/api/ask/id', ask.read_id);

router.get('/api/ask/mine', ask.read_mine);

router.post('/api/ask/create',ask.create);

router.get('/api/ask/delete', ask.delete);

module.exports = {router};




