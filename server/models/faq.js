const db =  require('../config/db_config');


const dbModel = {
  read: async () => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT * FROM faq;`;
    let result = await conn.promise().query(sql)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
      
    db.disconnect(conn);
    return result[0];
  },

  create: async (p) => {
    
    let conn = db.init();
    db.connect(conn);
   
    let sql = `INSERT INTO faq (title, question, answer) VALUES (?, ?, ?);`;
    let result = await conn.promise().query(sql, [p.title, p.question, p.answer])
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },

  update: async (p) => {
    
    let conn = db.init();
    db.connect(conn);
   
    let sql = `UPDATE faq SET title=?, question=?, answer=? WHERE id=?`;
    let result = await conn.promise().query(sql, [p.title, p.question, p.answer, p.id])
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },

  delete: async (p) => {
    
    let conn = db.init();
    db.connect(conn);
   
    let sql = `DELETE FROM faq WHERE id=?`;
    let result = await conn.promise().query(sql, p)
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
   
    db.disconnect(conn);
    
    return true;
  },
};

module.exports =  dbModel;