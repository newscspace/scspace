const db =  require('../config/db_config');


const dbModel = {

  readAll: async () => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT * FROM ask ORDER BY time_post desc;`;
    let result = await conn.promise().query(sql)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
      
    db.disconnect(conn);
    return result[0];
  },

  readId: async (p) => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT * FROM ask where id=?;`;
    let result = await conn.promise().query(sql, p)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
   
    sql = `UPDATE ask SET hits = hits + 1 where id=?`;
    await conn.promise().query(sql, p)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
   
    db.disconnect(conn);
    
    return result[0][0];
  },

  readMine: async (p) => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT * FROM ask where writer_id=?;`;
    let result = await conn.promise().query(sql)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
      
    db.disconnect(conn);
    return result[0];
  },

  create: async (p) => {  
    let conn = db.init();
    db.connect(conn);
   
    let sql = `INSERT INTO ask (title, time_post, content, state, writer_id) VALUES (?, ?, ?, 'wait', '12345678');`;
    let result = await conn.promise().query(sql, [p.title, p.time_post, p.content])
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },

  delete: async (p) => { 
    let conn = db.init();
    db.connect(conn);
   
    let sql = `DELETE FROM ask WHERE id=?`;
    let result = await conn.promise().query(sql, p)
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },

};

module.exports =  dbModel;