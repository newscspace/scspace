const express = require('express');
const router = express.Router();
const easteregg = require('../controllers/Easteregg');

router.get('/api/easteregg/getresv', easteregg.getresv);

module.exports = {router};