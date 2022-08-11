const express = require('express');
const router = express.Router();
const jwt = require('../controllers/Jwt');





router.post('/api/jwt/login',jwt.login);

router.post('/api/jwt/verification', jwt.verification);

router.get('/api/jwt/logout', jwt.logout);

module.exports = {router};




