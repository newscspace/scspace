const db =  require('../config/db_config');


const dbModel = {
  readAll: async () => {
    let return_result;
      let sql = `SELECT * FROM notice ORDER BY important desc, time_post desc;`;

    let conn = db.getConnection().promise();


    await conn.query(sql)
      .then((result) => {return_result = result[0];})
      .catch((err) => {console.log(err); return_result = null;})

    
    return return_result;
  },

  readId: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
    let sql = `SELECT * FROM notice where id=?;`;

    await conn.query(sql, p)
      .then((result) => {return_result = result[0][0];})
      .catch(err => {console.log(err); return_result =  null;});
   
    sql = `UPDATE notice SET hits = hits + 1 where id=?`;
      
      await conn.query(sql, p)
      .catch(err => {console.log(err);});


    
    return return_result;
  },

  create: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `INSERT INTO notice (title, time_post, important, content) VALUES (?, ?, ?, ?);`;
    await conn.query(sql, [p.title, p.time_post, p.important, p.content])
      .then(() => {return_result = true;})
      .catch(err => {console.log(err); return_result = false;});
   
    
    return return_result;
  },

  update: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `UPDATE notice SET title=?, time_edit=?, important=?, content=? WHERE id=?`;
    await conn.query(sql, [p.title, p.time_edit, p.important, p.content, p.id])
      .then(() => {return_result = true})
      .catch(err => {console.log(err); return_result = false;});
    
    return return_result;
  },

  delete: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `DELETE FROM notice WHERE id=?`;
    await conn.query(sql, p)
      .then(() => {return_result = true;})
    .catch(err => {console.log(err);return_result = false;});
   
    
    return return_result;
  },
};

module.exports =  dbModel;