const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db_info = {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PWD,
    database : process.env.DB_NAME
};



const db = {
    init: () => {
      return mysql.createConnection(db_info);
    },
    
    connect: (conn) => {
      conn.connect((err) => {
        if (err) {
          console.log('mysql connect error' + err);
        }
      });
    },

    disconnect: (conn) => {
      conn.end((err) => {
        if (err) {
          console.log('mysql close error' + err);
        }
      });
    },
  };
  
  module.exports = db;