const db = require('../models/reservation');
const auth = require('./Jwt');

reservation = {
    create : (req, res) => {
      if(!('scspacetoken' in req.cookies)){
        res.send(false)
    }

    auth.get_data(req.cookies.scspacetoken)
        .then((result) => {
            let p = {};
          
            p.reserver_id = result.student_id;
            p.reserver_name = result.name;
            p.space = req.body.spaceName;
            p.team_id = req.body.teamId;
            p.time_from = req.body.timeFrom;
            p.time_to = req.body.timeTo;
            p.time_request = new Date();
            p.content = req.body.content;
            p.state = 'wait';

            db.create(p)
            .then ((result) => {
                res.json({'reserveId':result});
            });
        })
    },


    readMine : (req, res) =>{
      if(!('scspacetoken' in req.cookies)){
        res.send(false)
    }

    auth.get_data(req.cookies.scspacetoken)
        .then((result) => {
            let p = result.student_id;
            db.readMine(p)
                .then(result => {res.json(result);})
                .catch ((err) => {console.log(err); res.json(false)})
        })
  },

  
    readId : (req, res) => {
      db.readId([parseInt(req.query.id)])
          .then(result => {res.json(result);})
          .catch ((err) => {console.log(err); res.json(false)})
  },

  read : (req, res) => {
    db.read([parseInt(req.query.id)])
        .then(result => {res.json(result);})
        .catch ((err) => {console.log(err); res.json(false)})
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
  },

  latestRead : (req, res) => {
    db.latestRead()
        .then(result => {res.json(result);})
        .catch ((err) => {console.log(err); res.json(false)})
},



}


module.exports = reservation

