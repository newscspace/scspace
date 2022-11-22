const db =  require('../config/db_config');

const dbModel = {
    getResv: async (p) => {
        let conn = db.getConnection().promise();
        let return_result;

        let sql = `select resv_hits from easteregg where student_id=?;`;
    
        await conn.query(sql, p)
          .then((result) => {return_result = result[0];})
          .catch((err) => {console.log(err); return_result = null;})
    
        return return_result;
      },

    setWinPrize: async (p) => {
      let conn = db.getConnection().promise();
      let return_result;

      let sql = `update easteregg set win_prize = true where student_id=?;`;
  
      await conn.query(sql, p)
        .then(() => {return_result = true;})
        .catch((err) => {console.log(err); return_result = false;})
  
      return return_result;
    },

    getWinPrize: async (p) => {
      let conn = db.getConnection().promise();
      let return_result;

      let sql = `select win_prize from easteregg where student_id=?;`;
  
      await conn.query(sql, p)
        .then((result) => {return_result = result[0][0].win_prize;})
        .catch((err) => {console.log(err); return_result = null;})

      return return_result;
    },

    sumVesta: async () => {
      let conn = db.getConnection().promise();
      let return_result;

      let sql = `SELECT COUNT(win_prize) FROM easteregg WHERE win_prize=true;;`;
  
      await conn.query(sql)
        .then((result) => {return_result = result[0][0];})
        .catch((err) => {console.log(err); return_result = null;})

      return Object.values(return_result)[0];
    }
    
};

module.exports =  dbModel;