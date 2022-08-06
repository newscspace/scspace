const db = require('../models/notice');

notice = {
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


module.exports = notice
