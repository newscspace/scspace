const express = require('express');
const router = express.Router();
const etc = require('../controllers/Etc');


router.get('/api/etc/get_grp', etc.get_grp);

module.exports = {router};