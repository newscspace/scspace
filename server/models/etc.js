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
  },

  new_grp: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `INSERT INTO etc(grp_password) VALUES (?);`;
    await conn.query(sql, p)
      .then(() => {return_result = true;})
      .catch(err => {console.log(err); return_result = false;});
   
    
    return return_result;
  },

  check_reserved: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SQLSQLSQL;`; // ???
    await conn.query(sql)
      .then((result) => {return_result = result[0]} )
      .catch(err => {console.log(err); return_result = null;});
    
    return return_result;
  }

};

module.exports =  dbModel;