const db = require('../models/easteregg');

easteregg = {
    getresv : async (p) =>{
        let return_result;
        await db.getResv(p)
            .then (result => {return_result = result[0];})
            .catch ((err) => {console.log(err);});
        return return_result;
    },

    setwinprize : async (p) =>{
        let return_result;
        await db.setWinPrize(p)
            .then ((result) => {return_result = result;})
            .catch ((err) => {console.log(err); return_result = false;});
        return return_result;
    },

    getwinprize : async (p) =>{
        let return_result;
        await db.getWinPrize(p)
            .then (result => {return_result = result;})
            .catch ((err) => {console.log(err);});
        return return_result;
    },

    sumvesta : async () =>{
        let return_result;
        await db.sumVesta()
            .then (result => {return_result = result;})
            .catch ((err) => {console.log(err);});
        return return_result;
    }
}

module.exports = easteregg