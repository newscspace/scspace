const express = require('express');
const router = express.Router();
const space = require('../controllers/Space');





router.get('/api/space/read', space.read);

router.post('/api/space/update', space.update);


module.exports = {router};




