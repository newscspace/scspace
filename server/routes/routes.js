const express = require('express');
const router = express.Router();
const reservation = require('./reservation');


router.post('/api/reservation/*', reservation.router);
router.get('/api/reservation/*', function (req, res) {
    res.json({
        'type' : 2, // 공간 코드는 숫자나 enum으로
        'user' : 1, // UID
        'from' : new Date('2022-07-17T13:24:00'), //한국시간 기준
        'to' : new Date('2022-07-17T15:24:00'),
        'team' : 1, //TEAM id
        'comment' : null
    }); // Obviously dummy code
});

router.get('/api/notice', function (req, res) {
    res.json([
        {
            'id' : 1,
            'title' : '더워',
            'date' : new Date('2022-07-17T15:24:00'),
            'hits' : 43,
            'important' : false
        },
        {
            'id' : 2,
            'title' : '38도라고 미쳤어',
            'date' : new Date('2022-07-17T16:24:00'),
            'hits' : 4,
            'important' : true
        },
    ]); // Obviously dummy code
});
router.get('/api/notice/id', function (req, res) {
    res.json({
            'title' : '더워',
            'date' : new Date('2022-07-17T15:24:00'),
            'hits' : 43,
            'important' : false,
            'content' : '여행 왔는데 폭염이라 나가지도 못하네 가이드투어 버스라도 할걸 근데 버스 해봤자 취소되더라'
    }); // Obviously dummy code
});
router.get('/api/notice/all', function (req, res) {
    res.json([
        {
            'id' : 1,
            'title' : '더워',
            'date' : new Date('2022-07-17T15:24:00'),
            'hits' : 43,
            'important' : false,
            'content' : '여행 왔는데 폭염이라 나가지도 못하네 가이드투어 버스라도 할걸 근데 버스 해봤자 취소되더라'
        },
        {
            'id' : 2,
            'title' : '38도라고 미쳤어',
            'date' : new Date('2022-07-17T16:24:00'),
            'hits' : 4,
            'important' : true,
            'content' : '건물은 에어컨도 없다? 진짜 안에만 있어도 땀이 나. 심지어 여긴 오후 4시가 가장 더워'
        },
    ]); // Obviously dummy code
});

router.get('/api/faq', function (req, res) {
    res.json([
        {
            'id' : 1,
            'title' : '더워', // FAQ에는 date, hits, important가 없고 question/answer만
        },
        {
            'id' : 2,
            'title' : '38도라고 미쳤어',
        },
    ]); // Obviously dummy code
});
router.get('/api/faq/id', function (req, res) {
    res.json({
        'title' : '더워',
        'question' : '그냥 나가면 안되나요?',
        'answer' : '에어비엔비 호스트마저 만류하더라고요'
    }); // Obviously dummy code
});
router.get('/api/faq/all', function (req, res) {
    res.json([
        {
            'id' : 1,
            'title' : '더워', // FAQ에는 date, hits, important가 없고 question/answer만
            'question' : '그냥 나가면 안되나요?',
            'answer' : '에어비엔비 호스트마저 만류하더라고요'
        },
        {
            'id' : 2,
            'title' : '38도라고 미쳤어',
            'question' : '버스는 시원하잖아요..?',
            'answer' : '독일엔 에어컨버스 따위 없다.'
        },
    ]); // Obviously dummy code
});

router.get('/api/contact', function (req, res) {
    res.json({
        'message' : "불만사항이 제대로 접수되지 않고 시공의 폭풍 속으로 날아가버렸습니다."
    }); // Obviously dummy code
});

router.get('/api/spaces', function (req, res) {
    res.json([
        {
            'type' : 1, // 공간 코드는 숫자나 enum으로
            'name' : '피아노실1', //공식 명칭
            'isClosed' : false,
            'comment' : null,
            'requirements' : [1,2,3,6] // 필요사항(예약 시간 등) 코드
        },
        {
            'type' : 1, // 공간 코드는 숫자나 enum으로
            'name' : '피아노실2', //공식 명칭
            'isClosed' : false,
            'comment' : null,
            'requirements' : [1,2,3,6] // 필요사항(예약 시간 등) 코드
        },
        {
            'type' : 2, // 공간 코드는 숫자나 enum으로
            'name' : '미래홀', //공식 명칭
            'isClosed' : false,
            'comment' : null,
            'requirements' : [1,2,3,4,5,6,7] // 필요사항(예약 시간 등) 코드
        },
        {
            'type' : 3, // 공간 코드는 숫자나 enum으로
            'name' : '울림홀', //공식 명칭
            'isClosed' : true,
            'comment' : null,
            'requirements' : [1,2,3,4,5,6,7] // 필요사항(예약 시간 등) 코드
        },
    ]); // Obviously dummy code
});

module.exports = {router};
