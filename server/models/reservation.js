const db =  require('../config/db_config');


const dbModel = {
  readAll: async () => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT * FROM reservation WHERE (time_request BETWEEN DATE_ADD(NOW(),INTERVAL -2 MONTH ) AND NOW())  ORDER BY time_request DESC;`;
    await conn.query(sql)
      .then((result) => {return_result = result[0]})
    .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  },

  readId: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `SELECT * FROM reservation where id=?;`;
    await conn.query(sql, p)
    .then((result) => {return_result = result[0][0]})
    .catch(err => {console.log(err); return_result = null;});

    
    return return_result;
  },

  readMine: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `SELECT * FROM reservation where reserver_id=? ORDER BY time_request desc;`;
    await conn.query(sql, p)
    .then((result) => {return_result = result[0];})
    .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  },


  readCalendar: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `SELECT id, space, time_from, time_to, content FROM reservation WHERE ((MONTH(time_from) = MONTH(?) AND YEAR(time_from) = YEAR(?)) OR JSON_EXTRACT(content, '$.recurrenceRule') IS NOT NULL) AND state!='rejected' `;
    await conn.query(sql, [new Date(p).toISOString().slice(0, 19).replace('T', ' '), new Date(p).toISOString().slice(0, 19).replace('T', ' ')])
    .then((result) => {return_result = result[0];})
    .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  },

  createCalendar: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `INSERT INTO reservation (reserver_id, reserver_name, space, team_id, time_to, time_from, time_request, content, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    await conn.query(sql, [p.reserver_id, p.reserver_name, p.space, p.team_id, new Date(p.time_to), new Date(p.time_from), p.time_request, JSON.stringify(p.content), p.state])
      .then(() => {return_result = true;})
      .catch(err => {console.log(err); return_result =  false;});
 
    
    return return_result;
  },

  checkDuplicate: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `SELECT id FROM reservation WHERE space=? AND (? < time_to AND ? > time_from) AND state!='rejected'`
    await conn.query(sql, [p.space, new Date(p.time_from), new Date(p.time_to)])
      .then((result) => {return_result = result[0];})
      .catch(err => {console.log(err); return_result =  false;});
    
      return return_result;

  },

  updateCalendar: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `UPDATE reservation SET space = ?, time_to = ?, time_from = ?, time_last_modified = ?, content = ?, state = ? WHERE id=?`;
    await conn.query(sql,[p.space, new Date(p.time_to), new Date(p.time_from), p.time_last_modified, JSON.stringify(p.content), p.state, p.id])
      .then(() => {return_result = true;})
      .catch(err => {console.log(err); return_result =  false;});
   
    return return_result;
  },

  create: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `INSERT INTO reservation (reserver_id, reserver_name, space, team_id, time_to, time_from, time_request, content, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    await conn.query(sql, [p.reserver_id, p.reserver_name, p.space, p.team_id, new Date(p.time_to), new Date(p.time_from), p.time_request, JSON.stringify(p.content), p.state])
      .then((result) => {return_result = result[0].insertId;})
      .catch(err => {console.log(err); return_result =  false;});
   
    return return_result;
  },

  update: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `UPDATE reservation SET space = ?, team_id = ?, time_to = ?, time_from = ?, time_last_modified = ?, content = ?, state = ? WHERE id=?`;
    await conn.query(sql,[p.space, p.team_id, new Date(p.time_to), new Date(p.time_from), p.time_last_modified, JSON.stringify(p.content), p.state, p.id])
    .then(() => {return_result = p.id;})
    .catch(err => {console.log(err); return_result =  false;});

    return return_result;
  },

  delete: async (p) => {
    
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `DELETE FROM reservation WHERE id=?`;
    await conn.query(sql, p)
    .then(() => {return_result = true;})
    .catch(err => {console.log(err);  return_result = false;});
   
    return return_result;
  },

  latestRead : async() => {
    let conn = db.getConnection().promise();    
    let return_result;

    let sql = `SELECT * FROM reservation WHERE (time_request BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW()) AND (state ='wait' OR (state ='grant' AND content IS NOT NULL AND content->'$.workComplete' IS NOT NULL AND content->'$.workComplete' =false)) ORDER BY time_request DESC;`;
    await conn.query(sql)
    .then((result) => {return_result = result[0];})
    .catch(err => {console.log(err); return_result = null;});
      
    return return_result;
  }, 

  createComment: async (p) => {  
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `UPDATE reservation SET comment=?, state=? WHERE id=?`;
    await conn.query(sql, [p.comment, p.state, p.id])
      .then(()=>{return_result =true;})
      .catch(err => {console.log(err); return_result =  false;});
    
    return return_result;
  },
};

module.exports =  dbModel;