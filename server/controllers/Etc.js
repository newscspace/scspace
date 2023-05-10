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
        return return_result;
    },
}

module.exports = etc