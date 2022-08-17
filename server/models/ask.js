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
   
    let sql = `INSERT INTO ask (title, time_post, content, state, writer_id) VALUES (?, ?, ?, ?, ?);`;
    await conn.promise().query(sql, [p.title, p.time_post, p.content, 'wait' , p.writer_id])
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
  
  createComment: async (p) => {  
    let conn = db.init();
    db.connect(conn);
   
    let sql = `UPDATE ask SET comment=?, state=? WHERE id=?`;
    await conn.promise().query(sql, [p.comment, p.dot, p.id])
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },

  readComment : async (p) => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT comment, state FROM ask where id=?;`;
    let result = await conn.promise().query(sql, p)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
   
    db.disconnect(conn);
    
    return result[0][0];
  },


};

module.exports =  dbModel;