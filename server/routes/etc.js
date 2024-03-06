const express = require('express');
const router = express.Router();
const etc = require('../controllers/Etc');


router.get('/api/etc/get_grp', etc.get_grp);

router.post('/api/etc/new_grp', etc.new_grp);

router.get('/api/etc/check_reserved_grp', etc.check_reserved_grp);

router.get('/api/etc/check_reserved_ws', etc.check_reserved_ws);

module.exports = {router};