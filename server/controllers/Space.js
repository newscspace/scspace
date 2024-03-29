const db = require('../models/space');

space = {
    read : (req, res) =>{
        let p = req.query.space;
        let return_result = {roomName:p};
        db.read([p])
            .then ((result) => {
                result.map((contents) => {
                    if (contents.menu === 'shortintro') {return_result.shortintro = contents.info.shortintro;}
                    else {return_result[contents.menu] = contents.info}
                })
                res.json(return_result);
            })
            .catch ((err) => {console.log(err); res.json(false)});
    },

    update : (req, res) => {
        db.update(req.body)
            .then (result => { 
                if(result){
                    let p = req.body.roomName;
                    let return_result = {roomName:p};

                    db.read([p])
                    .then ((result2) => {
                        result2.map((contents) => {
                            if (contents.menu === 'shortintro') {return_result.shortintro = contents.info.shortintro;}
                            else {return_result[contents.menu] = contents.info}
                        })
                        res.json(return_result);
                    })
                    .catch ((err) => {console.log(err); res.json(false)});

                }
                else res.send(false)
            })
            .catch(err => {res.send(false)})
    }, 






}


module.exports = space
