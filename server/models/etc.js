const db =  require('../config/db_config');


const dbModel = {

  get_grp: async () => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT * FROM etc ORDER BY id DESC LIMIT 1;`;
    await conn.query(sql)
      .then((result) => {return_result = result[0]} )
      .catch(err => {console.log(err); return_result = null;});
    
    return return_result;
  }

};

module.exports =  dbModel;