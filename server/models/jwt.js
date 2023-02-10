const db =  require('../config/db_config');


const dbModel = {
  Is_admin: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;
   
    let sql = `SELECT type FROM users where student_id=?;`;
    await conn.query(sql, p.mail)
      .then((result) => {return_result= (result[0][0].type === 'admin')})
    .catch(err => {console.log(err); return_result =  null});
      
    return return_result;
  },

  login: async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;

    let std_no = (p.ku_std_no === null) ? p.ku_employee_number : p.ku_std_no;
    let sql = `INSERT IGNORE INTO users (student_id,  name,  phone, email, type) VALUES (?,?,?,?,?);`;
    await conn.query(sql, [std_no, p.ku_kname, p.mobile, p.mail, 'user'])
      .catch(err => {console.log(err); return_result = false;});
    
    sql = `SELECT * FROM users WHERE student_id=? ORDER BY id DESC LIMIT 1;`;
    await conn.query(sql, [std_no])
      .then((result) => {return_result = result[0][0]})
      .catch(err => {console.log(err); return_result = false;});
    
    return return_result;
    
  },

  get_data : async (p) => {
    let conn = db.getConnection().promise();    
    let return_result;

    sql = `SELECT * FROM users WHERE student_id=? ORDER BY id DESC LIMIT 1;`
    await conn.query(sql, [p.ku_std_no])
      .then((result) => {return_result = result[0][0]})
      .catch(err => {console.log(err); return_result =  null;});
    
    return return_result;
  }

 
};

module.exports =  dbModel;