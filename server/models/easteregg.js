const db =  require('../config/db_config');

const dbModel = {
    getResv: async (p) => {
        let conn = db.getConnection().promise();
        let return_result;

        let sql = `select resv_hits from easteregg where student_id=?;`;
    
        await conn.query(sql, p)
          .then((result) => {return_result = result[0];})
          .catch((err) => {console.log(err); return_result = null;})
    
        return return_result;
      }
};

module.exports =  dbModel;