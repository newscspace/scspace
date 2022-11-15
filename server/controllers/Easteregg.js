const db = require('../models/easteregg');

easteregg = {
    getresv : async (p) =>{
        let return_result;
        await db.getResv(p)
            .then (result => {return_result = result[0];})
            .catch ((err) => {console.log(err);});
        return return_result;
    }
}

module.exports = easteregg