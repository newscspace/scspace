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

    let return_result = {team_name : '', member:[]};
    let sql = `SELECT * FROM team WHERE id=?`;
    await conn.promise().query(sql, [p])
    .then(async (result) => {
      return_result.team_name = result[0][0].name;
      sql = `SELECT * FROM member WHERE teamid=?`
      await conn.promise().query(sql, [p])
        .then((result2) => {
          return_result.member = result2[0];
        })
    })
    .catch(err => {console.log(err); db.disconnect(conn); return_result= null;});
      
    db.disconnect(conn);
    return return_result;
  },

  readMine: async (p) => {
    let conn = db.init();
    db.connect(conn);
    let return_result = [];
    let sql = `SELECT team.id , team.name FROM team INNER JOIN member ON team.id = member.teamid WHERE member.student_id=?;`;
    await conn.promise().query(sql, [p])
    .then((result) => {
      return_result = result[0]; 
        console.log(return_result);
    })
    .catch(err => {console.log(err); db.disconnect(conn); return_result= null;});
      
    db.disconnect(conn);
    return return_result;
  },

  create: async (p) => {  
    let conn = db.init();
    db.connect(conn);
    let return_result;
    let sql = `INSERT INTO team (name, delegator_id, time_register ) VALUES (?, ?, ?);`;
    await conn.promise().query(sql, [p.name, p.delegator_id, p.time_register])
      .then(async (result) => {
        sql = `INSERT INTO member (name, student_id, teamid) VALUES ?;`;
        for (let i = 0; i<p.member.length; i++){
          p.member[i].push(result[0].insertId);
        }
        await conn.promise().query(sql, [p.member])
        .then((result2) => {db.disconnect(conn);  return_result = result[0].insertId;})
        .catch(err => {console.log(err); db.disconnect(conn); return_result = false;});
      })
      .catch(err => {console.log(err); db.disconnect(conn); return_result = false;});

      return return_result;
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