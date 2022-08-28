const db =  require('../config/db_config');


const dbModel = {
  read: async () => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT * FROM faq;`;
    await conn.query(sql)
      .then((result) => {return_result = result[0]})
      .catch(err => {console.log(err); return_result = null;});

    return return_result;
  },

  create: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `INSERT INTO faq (question, answer) VALUES (?, ?);`;
    await conn.query(sql, [p.question, p.answer])
      .then(() =>{return_result = true;})
      .catch(err => {console.log(err); return_result = false;});
    
    return return_result;
  },

  update: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `UPDATE faq SET question=?, answer=? WHERE id=?`;
    await conn.query(sql, [p.question, p.answer, p.id])
      .then(()=>{return_result = true;})
      .catch(err => {console.log(err); return_result =  false;});
    
    return return_result;
  },

  delete: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `DELETE FROM faq WHERE id=?`;
    await conn.query(sql, p)
      .then(() => {return_result = true;})
      .catch(err => {console.log(err); return_result =  false;});
   
    return return_result;
  },
};

module.exports =  dbModel;