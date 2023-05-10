const express = require('express');
const router = express.Router();
const etc = require('../controllers/Etc');


router.get('/api/etc/get_grp', etc.get_grp);

router.post('/api/etc/new_grp', etc.new_grp);

router.get('/api/etc/check_reserved', etc.check_reserved);

module.exports = {router};