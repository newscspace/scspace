const express = require('express');
const router = express.Router();
const faq = require('../controllers/Ask');





router.get('/api/ask/all', faq.read_all);

router.get('/api/ask/id', ask.read_id);

router.get('/api/ask/mine', faq.read_mine);

router.post('/api/ask/create',faq.create);

router.get('/api/ask/delete', faq.delete);

module.exports = {router};




