const express = require('express');
const router = express.Router();
const etc = require('../controllers/Etc');


router.get('/api/etc/get_grp', etc.get_grp);

router.post('/api/etc/new_grp', etc.new_grp);

module.exports = {router};