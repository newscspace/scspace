const db =  require('../config/db_config');


const dbModel = {
  readAll: async () => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT * FROM notice ORDER BY important desc, time_post desc;`;
    let result = await conn.promise().query(sql)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
      
    db.disconnect(conn);
    return result[0];
  },

  readId: async (p) => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT * FROM notice where id=?;`;
    let result = await conn.promise().query(sql, p)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
   
    sql = `UPDATE notice SET hits = hits + 1 where id=?`;
    await conn.promise().query(sql, p)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
   
    db.disconnect(conn);
    
    return result[0][0];
  },

  create: async (p) => {
    
    let conn = db.init();
    db.connect(conn);
   
    let sql = `INSERT INTO notice (title, time_post, important, content) VALUES (?, ?, ?, ?);`;
    let result = await conn.promise().query(sql, [p.title, p.time_post, p.important, p.content])
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },

  update: async (p) => {
    
    let conn = db.init();
    db.connect(conn);
   
    let sql = `UPDATE notice SET title=?, time_edit=?, important=?, content=? WHERE id=?`;
    let result = await conn.promise().query(sql, [p.title, p.time_edit, p.important, p.content, p.id])
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },

  delete: async (p) => {
    
    let conn = db.init();
    db.connect(conn);
   
    let sql = `DELETE FROM notice WHERE id=?`;
    let result = await conn.promise().query(sql, p)
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },
};

module.exports =  dbModel;