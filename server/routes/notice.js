const express = require('express');
const router = express.Router();
const notice = require('../controllers/Notice');





router.get('/api/notice/all', notice.read_all);

router.get('/api/notice/id', notice.read_id);


router.post('/api/notice/create',notice.create);

router.post('/api/notice/update', notice.update);

router.get('/api/notice/delete', notice.delete);

module.exports = {router};




