const express = require('express');
const router = express.Router();
const reservation = require('./reservation');
const notice = require('./notice');
const faq = require('./faq');
const ask = require('./ask');

router.post('/api/reservation/*', reservation.router);
router.get('/api/reservation/*', reservation.router);

router.get('/api/notice/*', notice.router);
router.post('/api/notice/*', notice.router);

// router.get('/api/faq', function (req, res) {
//     res.json([
//         {
//             'id' : 1,
//             'title' : '더워', // FAQ에는 date, hits, important가 없고 question/answer만
//         },
//         {
//             'id' : 2,
//             'title' : '38도라고 미쳤어',
//         },
//     ]); // Obviously dummy code
// });
// router.get('/api/faq', function (req, res) {
//     res.json({
//         'question' : '그냥 나가면 안되나요?',
//         'answer' : '에어비엔비 호스트마저 만류하더라고요'
//     }); // Obviously dummy code
// });

router.get('/api/faq/*', faq.router);
router.post('/api/faq/*', faq.router);

router.get('/api/ask/*', ask.router);
router.post('/api/ask/*', ask.router);

router.get('/api/contact', function (req, res) {
    res.json({
        'message' : "불만사항이 제대로 접수되지 않고 시공의 폭풍 속으로 날아가버렸습니다."
    }); // Obviously dummy code
});

router.get('/api/spaces', function (req, res) {
    res.json([
        {
            'type' : 'piano_room', 
            'name' : '피아노실1', //공식 명칭
            'id' : 3,
            'isClosed' : false,
            'comment' : null,
            'requirements' : [1,2,3,6] // 필요사항(예약 시간 등) 코드
        },
        {
            'type' : 'piano_room', // 공간 코드는 숫자나 enum으로
            'name' : '피아노실2', //공식 명칭
            'id' : 4,
            'isClosed' : false,
            'comment' : null,
            'requirements' : [1,2,3,6] // 필요사항(예약 시간 등) 코드
        },
        {
            'type' : 'mirae_hall', // 공간 코드는 숫자나 enum으로
            'name' : '미래홀', //공식 명칭
            'id' : 5,
            'isClosed' : false,
            'comment' : null,
            'requirements' : [1,2,3,4,5,6,7] // 필요사항(예약 시간 등) 코드
        },
        {
            'type' : 'ullim_hall', // 공간 코드는 숫자나 enum으로
            'name' : '울림홀', //공식 명칭
            'id' : 6,
            'isClosed' : true,
            'comment' : null,
            'requirements' : [1,2,3,4,5,6,7] // 필요사항(예약 시간 등) 코드
        },
    ]); // Obviously dummy code
});

module.exports = {router};
