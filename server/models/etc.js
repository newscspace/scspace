const db =  require('../config/db_config');


const dbModel = {

  get: async () => {
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
    let ws;

    let sql = `SELECT ws_password FROM etc ORDER BY id DESC LIMIT 1;`;
    await conn.query(sql)
      .then((result) => {ws = result[0][0].ws_password})
    
    sql = `INSERT INTO etc(grp_password, ws_password) VALUES (?, ?);`;
    await conn.query(sql, [p, ws])
      .then(() => {return_result = true;})
      .catch(err => {console.log(err); return_result = false;});
   
    
    return return_result;
  },

  new_ws: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
    let grp;

    let sql = `SELECT grp_password FROM etc ORDER BY id DESC LIMIT 1;`;
    await conn.query(sql)
      .then((result) => {grp = result[0][0].grp_password})
   
    sql = `INSERT INTO etc(grp_password, ws_password) VALUES (?, ?);`;
    await conn.query(sql, [grp, p])
      .then(() => {return_result = true;})
      .catch(err => {console.log(err); return_result = false;});
   
    
    return return_result;
  },

  check_reserved_grp: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT reserver_id, time_from, time_to FROM reservation WHERE space='group-practice-room' and reserver_id=?;`;
    await conn.query(sql, p)
      .then((result) => {return_result = result[0]} )
      .catch(err => {console.log(err); return_result = null;});
    
    return return_result;
  },

  check_reserved_ws: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT reserver_id, time_from, time_to FROM reservation WHERE space='workshop' and reserver_id=?;`;
    await conn.query(sql, p)
      .then((result) => {return_result = result[0]} )
      .catch(err => {console.log(err); return_result = null;});
    
    return return_result;
  },

};

module.exports =  dbModel;