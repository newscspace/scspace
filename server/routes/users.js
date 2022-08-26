const express = require('express');
const router = express.Router();
const users = require('../controllers/Users');





router.get('/api/users/id', users.readId);




module.exports = {router};




