const db =  require('../config/db_config');


const dbModel = {
  readAll: async () => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT * FROM reservation;`;
    let result = await conn.promise().query(sql)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
      
    db.disconnect(conn);
    return result[0];
  },

  readId: async (p) => {
    let conn = db.init();
    db.connect(conn);
    let return_result;

    let sql = `SELECT * FROM reservation where id=?;`;
    await conn.promise().query(sql, p)
    .then((result) => {return_result = result[0][0]})
    .catch(err => {console.log(err); return_result = null;});

    db.disconnect(conn);
    
    return return_result;
  },

  readMine: async (p) => {
    let conn = db.init();
    db.connect(conn);
    let return_result;

    let sql = `SELECT * FROM reservation where reserver_id=? ORDER BY time_request desc;`;
    await conn.promise().query(sql, p)
    .then((result) => {return_result = result[0];})
    .catch(err => {console.log(err); return_result = null;});
      
    db.disconnect(conn);
    return return_result;
  },

  create: async (p) => {
    
    let conn = db.init();
    db.connect(conn);


    let sql = `INSERT INTO reservation (reserver_id, reserver_name, space, team_id, time_to, time_from, time_request, content, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    await conn.promise().query(sql, [p.reserver_id, p.reserver_name, p.space, p.team_id, new Date(p.time_to), new Date(p.time_from), p.time_request, JSON.stringify(p.content), p.state])
      .then((result) => {return_result = result[0].insertId;})
      .catch(err => {console.log(err); return_result =  false;});
   
    db.disconnect(conn);
    
    return return_result;
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

  latestRead : async() => {
    let conn = db.init();
    db.connect(conn);
    let return_result;

    let sql = `SELECT * FROM reservation WHERE (time_request BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW()) AND state='wait' ORDER BY time_request DESC;`;
    await conn.promise().query(sql)
    .then((result) => { db.disconnect(conn); return_result = result[0];})
    .catch(err => {console.log(err); db.disconnect(conn); return_result = null;});
      
    db.disconnect(conn);
    return return_result;
  }
};

module.exports =  dbModel;