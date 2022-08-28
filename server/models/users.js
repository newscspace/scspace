const db =  require('../config/db_config');


const dbModel = {
  readId: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `SELECT * FROM users WHERE student_id=?;`;
    await conn.query(sql, p)
      .then ((result) => {
            return_result = result[0][0]
      })
      .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  },

  

};

module.exports =  dbModel;