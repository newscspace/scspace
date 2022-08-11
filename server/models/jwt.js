const db =  require('../config/db_config');


const dbModel = {
  Is_admin: async (p) => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `SELECT type FROM users where student_id=?;`;
    let result = await conn.promise().query(sql, p.mail)
    .catch(err => {console.log(err); db.disconnect(conn); return null;});
      
    db.disconnect(conn);
    return result[0][0];
  },

  login: async (p) => {
    let conn = db.init();
    db.connect(conn);
   
    let sql = `INSERT IGNORE INTO users (student_id,  name,  phone, email, type) VALUES (?,?,?,?,?);`;
    let result = await conn.promise().query(sql, [p.ku_std_no, p.ku_kname, p.mobile, p.mail, 'user'])
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
 
    sql = `SELECT * FROM users WHERE student_id=? ORDER BY id DESC LIMIT 1;`;
    result = await conn.promise().query(sql, [p.ku_std_no])
    .catch(err => {console.log(err); db.disconnect(conn); return false;});
    
    return result[0][0];
    
  },

  get_data : async (p) => {
    sql = `SELECT * FROM users WHERE student_id=? ORDER BY id DESC LIMIT 1;`
    result = await conn.promise().query(sql, [p.ku_std_no])
    .catch(err => {console.log(err); db.disconnect(conn); return null;});


    db.disconnect(conn);
    
    return result[0][0];
  }

 
};

module.exports =  dbModel;