const db = require('../models/notice');

reservation = {
    create : (req, res) => {
      let p = req.body;
      p.time_request = new Date();
      db.create(p)
         .then (result => { result ? res.send(true) : res.send(false)});
    },
    
    read : (req, res) =>{
     db.readAll()
       .then (result => {res.json(result);})
       .catch (() => {console.log(result);});
    },

    update : (req, res) => {
      let p = req.body;
      p.time_edit = new Date();
      db.update(p)
          .then (result => { result ? res.send(true) : res.send(false)});
  }, 

  delete  : (req, res) => {
      db.delete([parseInt(req.query.id)])
      .then (result => { result ? res.send(true) : res.send(false)});
  }



}


module.exports = reservation

// {
//     'type' : 2, // 공간 코드는 숫자나 enum으로
//     'user' : 1, // UID
//     'from' : new Date('2022-07-17T13:24:00'), //한국시간 기준
//     'to' : new Date('2022-07-17T15:24:00'),
//     'team' : 1, //TEAM id
//     'comment' : null,
//     'state' : 'granted'
// },
// {
//     'type' : 2, // 공간 코드는 숫자나 enum으로
//     'user' : 1, // UID
//     'from' : new Date('2022-07-18T13:24:00'), //한국시간 기준
//     'to' : new Date('2022-07-19T15:24:00'),
//     'team' : 1, //TEAM id
//     'comment' : null,
//     'state' : 'wait'
// },
