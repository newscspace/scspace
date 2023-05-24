const db = require('../models/etc');

etc = {
    get_grp : async (req, res) => {
        let return_result;
        await db.get_grp()
            .then (result => {
                return_result = result[0];
                res.send(return_result['grp_password']);
            })
            .catch ((err) => {console.log(err);});
    },

    new_grp : async (req, res) => {
        let ran = Math.floor(Math.random() * 10000);
        ran = ran.toString();
        while(ran.length < 4) ran = "0" + ran;

        await db.new_grp(ran)
            .then (result => { result ? res.send(true) : res.send(false)});
    },

    check_reserved : async (req, res) => {
        let p = req.query.id;
        let return_result = false;
        let present, show_start, show_end;
        await db.check_reserved(p)
            .then (result => {
                present = new Date();
                for(let r of result){
                    show_start = r.time_from.setMinutes(r.time_from.getMinutes() - 30);
                    show_end   = r.time_to;
                    if(show_start <= present && present <= show_end){
                        return_result = true;
                    }
                }
                res.send(return_result);
            })
            .catch ((err) => {console.log(err);});
    },
}

module.exports = etc