const express = require('express');
const router = express.Router();
const team = require('../controllers/Team');





// router.get('/api/team/all', team.read_all);

router.get('/api/team/id', team.readId);

router.get('/api/team/mine', team.readMine);

router.post('/api/team/create',team.create);

// router.get('/api/team/delete', team.delete);

module.exports = {router};




