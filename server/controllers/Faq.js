const db = require('../models/faq');

faq = {
    create : (req, res) => {
        db.create(req.body)
            .then (result => { result ? res.send(true) : res.send(false)});
    },

    read : (req, res) =>{
        db.read()
            .then (result => {res.json(result);})
            .catch ((err) => {console.log(err);});
    },

    update : (req, res) => {
        db.update(req.body)
            .then (result => { result ? res.send(true) : res.send(false)});
    }, 

    delete  : (req, res) => {
        db.delete([parseInt(req.query.id)])
        .then (result => { result ? res.send(true) : res.send(false)});
    }





}


module.exports = faq
