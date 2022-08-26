const db = require('../models/users');

users = {
    readId : (req, res) =>{
        let p = req.query.id;
        db.readId([p])
            .then ((result) => {
                res.json(result);
            })
            .catch ((err) => {console.log(err); res.json(false)});
    },






}


module.exports = users
