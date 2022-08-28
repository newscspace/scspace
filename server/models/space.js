const db =  require('../config/db_config');


const dbModel = {
  read: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `SELECT * FROM space WHERE space_name=?;`;
    await conn.query(sql, p)
      .then ((result) => {
            return_result = result[0]
      })
      .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  },

  
  update: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;

    if(p.menu === 'shortintro'){
      let sql = `UPDATE space SET info=? WHERE space_name=? AND menu=?`;
      
      await conn.query(sql, [JSON.stringify({shortintro : p.shortintro}), p.roomName, p.menu])
        .then(() => {
            return_result = true;
        })
        .catch((err) => {console.log(err);  return_result = false;})
    }

    else{
      let sql = `UPDATE space SET info=? WHERE space_name=? AND menu=?`;
      await conn.query(sql, [JSON.stringify(p[p.menu]), p.roomName, p.menu])
      .then(() => {
          return_result = true;
      })
      .catch((err) => {console.log(err);  return_result = false;})
    }
    
    return return_result;
  },

};

module.exports =  dbModel;