const express = require('express');
const router = express.Router();
const faq = require('../controllers/Faq');





router.get('/api/faq/all', faq.read);

router.post('/api/faq/create',faq.create);

router.post('/api/faq/update', faq.update);

router.get('/api/faq/delete', faq.delete);

module.exports = {router};




