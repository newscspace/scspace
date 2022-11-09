const db =  require('../config/db_config');

const dbModel = {
    readAll: async () => {
        let return_result;
          let sql = `SELECT * FROM notice ORDER BY time_post desc;`;
    
        let conn = db.getConnection().promise();
    
    
        await conn.query(sql)
          .then((result) => {return_result = result[0];})
          .catch((err) => {console.log(err); return_result = null;})
    
        
        return return_result;
      }
};

module.exports =  dbModel;
