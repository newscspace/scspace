const db = require('../models/team');
const auth = require('./Jwt');

team = {
    create : (req, res) => {
        if(!('scspacetoken' in req.cookies)){
            res.send(false)
        }

        auth.get_data(req.cookies.scspacetoken)
            .then((result) => {
                let p = {};
                p.name = req.body.team_name;
                p.delegator_id = result.student_id;
                p.time_register = new Date();
                p.member = [[result.name, result.student_id]];
                for (let i=0; i<req.body.member.length; i++){
                    p.member.push(Object.values(req.body.member[i]))
                }

                db.create(p)
                .then ((result) => {
                    console.log(result);
                    res.json({teamid:result});
                });
            })
       
    },
    
    readMine : (req, res) => {
        if(!('scspacetoken' in req.cookies)){
            res.send(false)
        }

        auth.get_data(req.cookies.scspacetoken)
            .then((result) => {
                let p = result.student_id;
                db.readMine(p)
                    .then(result => {res.json(result);})
                    .catch (() => {console.log('error');})
            })
    },

    readId : (req, res) => {
        if(!('scspacetoken' in req.cookies)){
            res.send(false)
        }

        auth.get_data(req.cookies.scspacetoken)
            .then((result) => {
                let p = req.query.id;
                db.readId([p])
                    .then(result => {console.log(result); res.json(result);})
                    .catch (() => {console.log('error');})
            })
    },

    // read_all : (req, res) =>{
    //     db.readAll()
    //         .then (result => {res.json(result);})
    //         .catch (() => {console.log(result);});
    // },

    // update : (req, res) => {
    //     let p = req.body;
    //     p.time_edit = new Date();
    //     db.update(p)
    //         .then (result => { result ? res.send(true) : res.send(false)});
    // }, 

    // delete  : (req, res) => {
    //     db.delete([parseInt(req.query.id)])
    //     .then (result => { result ? res.send(true) : res.send(false)});
    // }


}


module.exports = team
