const db = require('../models/ask');

ask = {
    create : (req, res) => {
        let p = req.body;
        p.time_post = new Date();
        db.create(p)
            .then (result => { result ? res.send(true) : res.send(false)});
    },
    
    read_id : (req, res) => {
        db.readId([parseInt(req.query.id)])
            .then(result => {res.json(result);})
            .catch (() => {console.log(result);})
    },

    read_all : (req, res) =>{
        db.readAll()
            .then (result => {res.json(result);})
            .catch (() => {console.log(result);});
    },

    read_mine : (req, res) =>{
        db.readMine([parseInt(req.query.writer_id)])
            .then (result => {res.json(result);})
            .catch (() => {console.log(result);});
    },

    delete  : (req, res) => {
        db.delete([parseInt(req.query.id)])
        .then (result => { result ? res.send(true) : res.send(false)});
    }


}


module.exports = ask

// reservation = {
//     create : (req, res) => {
//         console.log('create');
//         console.log(req.body);
//     },
    
//     read_all : (req, res) => {
//         res.json([
//             {
//                 'id' : 1,
//                 'title' : '더워', // FAQ에는 date, hits, important가 없고 question/answer만
//                 'question' : '그냥 나가면 안되나요?',
//                 'answer' : '에어비엔비 호스트마저 만류하더라고요',
//                 'state' : '대기중'
//             },
//             {
//                 'id' : 2,
//                 'title' : '38도라고 미쳤어',
//                 'question' : '버스는 시원하잖아요..?',
//                 'answer' : '독일엔 에어컨버스 따위 없다.',
//                 'state' : '해결됨'
//             },
//         ]); // Obviously dummy code
//     },

//     read_mine : (req, res) => {
//         res.json([
//             {
//                 'id' : 1,
//                 'title' : '더워', // FAQ에는 date, hits, important가 없고 question/answer만
//                 'question' : '그냥 나가면 안되나요?',
//                 'answer' : '에어비엔비 호스트마저 만류하더라고요',
//                 'state' : '대기중'
//             },
//             {
//                 'id' : 2,
//                 'title' : '38도라고 미쳤어',
//                 'question' : '버스는 시원하잖아요..?',
//                 'answer' : '독일엔 에어컨버스 따위 없다.',
//                 'state' : '해결됨'
//             },
//         ]); // Obviously dummy code
//     },

//     delete  : (req, res) => {
//         console.log('delete');
//     }



// }


// module.exports = reservation
