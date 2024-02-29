const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({path: "/home/ec2-user/scspace/server/.env"});

const db_info = {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PWD,
    database : process.env.DB_NAME,
    connectionLimit : 100
};

const pool = mysql.createPool(db_info);


const db = {    
    getConnection: () => {
      return pool;
    },

  };
  
  module.exports = db;