const db =  require('../config/db_config');


const dbModel = {

  readAll: async () => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT * FROM ask ORDER BY time_post desc;`;
    await conn.query(sql)
      .then((result) => {return_result = result[0]} )
      .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  },

  readId: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
    let sql = `SELECT * FROM ask where id=?;`;

    await conn.query(sql, p)
      .then((result) => {return_result = result[0][0];})
      .catch(err => {console.log(err); return_result =  null;});
   
    sql = `UPDATE ask SET hits = hits + 1 where id=?`;
       
      await conn.query(sql, p)
      .catch(err => {console.log(err);});


    
    return return_result;
  },

  readMine: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT * FROM ask where writer_id=?;`;
    await conn.query(sql)
      .then((result) => {return_result = result[0]})
      .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  },

  create: async (p) => {  
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `INSERT INTO ask (title, time_post, content, state, writer_id) VALUES (?, ?, ?, ?, ?);`;
    await conn.query(sql, [p.title, p.time_post, p.content, 'wait' , p.writer_id])
    .then(() => {return_result = true;})
    .catch(err => {console.log(err); return_result = false;});
    
    return return_result;
  },

  delete: async (p) => { 
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `DELETE FROM ask WHERE id=?`;
    await conn.query(sql, p)
      .then(() => {return_result =true;})
      .catch(err => {console.log(err); return_result = false;});
   
    
    return return_result;
  },
  
  createComment: async (p) => {  
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `UPDATE ask SET comment=?, state=? WHERE id=?`;
    await conn.query(sql, [p.comment, p.dot, p.id])
      .then(() => {return_result = true;})
      .catch(err => {console.log(err); return_result = false;});

    return return_result;
  },

  readComment : async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT comment, state FROM ask where id=?;`;
    await conn.query(sql, p)
      .then((result) => {return_result = result[0][0]})
      .catch(err => {console.log(err); return_result =  null;});
   
    return return_result;
  },

  latestRead : async() => {
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `SELECT * FROM ask WHERE (time_post BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW()) AND state='wait' ORDER BY time_post DESC; `;
    await conn.query(sql)
    .then((result) => {return_result = result[0];})
    .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  }


};

module.exports =  dbModel;