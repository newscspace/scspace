const db = require('../config/db_config');
/* db 생성 테스트 */

const conn = db.getConnection().promise();  

set_db = {
  set_db: () => {


    conn.query(`CREATE TABLE IF NOT EXISTS team (
        id INTEGER	NOT NULL AUTO_INCREMENT,
        name	CHAR(70)	NOT NULL,
        delegator_id	CHAR(8)	NOT NULL,
        time_register	datetime	NOT NULL,
        PRIMARY KEY (id)
    );`, (error, rows, fields) => {
      if (error) throw error;
      console.log('data: ', rows);
    });
    conn.query(` CREATE TABLE IF NOT EXISTS member (
        id	INTEGER	NOT NULL AUTO_INCREMENT,
        teamid	INTEGER	NOT NULL,
        name	varchar(255)	NOT NULL,
        student_id	CHAR(8)	NOT NULL,
        PRIMARY KEY (id)
    );`, (error, rows, fields) => {
      if (error) throw error;
      console.log('data: ', rows);
    });

    conn.query(`  CREATE TABLE IF NOT EXISTS users (
        id	INTEGER	NOT NULL AUTO_INCREMENT,
        student_id	CHAR(8)	NOT NULL,
        name	varchar(255)	NOT NULL,
        phone	char(20)	NULL,
        email	varchar(255)	NULL,
        type	enum('admin', 'user')	NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY (student_id)
    );`, (error, rows, fields) => {
      if (error) throw error;
      console.log('data: ', rows);
    });

    conn.query(` CREATE TABLE IF NOT EXISTS reservation (
        id	INTEGER	NOT NULL AUTO_INCREMENT,
        reserver_id	Char(8)	NOT NULL,
        reserver_name Char(128) NOT NULL,
        space	enum('individual-practice-room1','individual-practice-room2','individual-practice-room3','piano-room1','piano-room2','seminar-room1','seminar-room2','dance-studio','group-practice-room','mirae-hall','ullim-hall','open-space','workshop')	NOT NULL,
        team_id	Integer	NULL,
        time_from	datetime	NOT NULL,
        time_to	datetime	NOT NULL,
        time_request	datetime	NOT NULL,
        time_last_modified	datetime	NULL,
        content	json	NULL,
        comment	varchar(420)	NULL,
        state enum('grant', 'wait', 'rejected'),
        PRIMARY KEY (id)
    ); `, (error, rows, fields) => {
      if (error) throw error;
      console.log('data: ', rows);
    });

    conn.query(`
      CREATE TABLE IF NOT EXISTS notice (
          id	INTEGER	NOT NULL AUTO_INCREMENT,
          time_post	datetime	NOT NULL,
          time_edit	datetime	NULL,
          title	varchar(255)	NOT NULL,
          content	text	NOT NULL,
          hits	Integer	NOT NULL	DEFAULT 0,
          important boolean NOT NULL DEFAULT 0,
          PRIMARY KEY (id)
      ); `, (error, rows, fields) => {
      if (error) throw error;
      console.log('data: ', rows);
    });

    conn.query(`  CREATE TABLE IF NOT EXISTS ask (
        id	INTEGER	NOT NULL AUTO_INCREMENT,
        writer_id	char(8)	NOT NULL,
        time_post	datetime	NOT NULL,
        time_edit	datetime	NULL,
        title	varchar(255)	NOT NULL,
        content	text	NOT NULL,
        hits	integer	NOT NULL	DEFAULT 0,
        state	enum('wait', 'receive', 'solve')	NOT NULL,
        comment	text	NULL,
        PRIMARY KEY (id)
    );`, (error, rows, fields) => {
      if (error) throw error;
      console.log('data: ', rows);
    });

    conn.query(`  CREATE TABLE IF NOT EXISTS faq (
        id	INTEGER	NOT NULL AUTO_INCREMENT,
        question varchar(255) NOT NULL,
        answer text NOT null,
        PRIMARY KEY (id)
    );`, (error, rows, fields) => {
      if (error) throw error;
      console.log('data: ', rows);
    });

    conn.query(`  CREATE TABLE IF NOT EXISTS space (
        id	INTEGER	NOT NULL AUTO_INCREMENT,
        space_name enum('individual-practice-room','piano-room','seminar-room','dance-studio','group-practice-room','mirae-hall','ullim-hall','open-space','workshop')	NOT NULL,
        menu enum('introduction', 'usage', 'caution', 'shortintro') NOT null,
        info json NOT NULL,
        PRIMARY KEY (id)
    );`, (error, rows, fields) => {
      if (error) throw error;
      console.log('data: ', rows);
    });


spaceList = ['individual-practice-room', 'piano-room', 'dance-studio', 'seminar-room', 'group-practice-room', 'ullim-hall', 'mirae-hall', 'open-space', 'workshop'];
spaceList.map((space) => {

  conn.query(`INSERT INTO space (space_name, menu, info) VALUES (?, 'shortintro', '{"shortintro" : "개인연습실입니당"}');`, [space],
  (error, rows, fields) => {
    if (error) throw error;
    console.log('data: ', rows);
  });

conn.query(`INSERT INTO space (space_name, menu, info) 
  VALUES (?, 'introduction', '{"intro" : "개인 연습을 할 수 있어요", "content" : [{"title":"상시 예약", "body" : {"head":"어쩌구 저쩌구", "list" : ["어쩌구 저쩌구1", "어쩌구 저쩌구 2"]}}]}');`, [space], 
  (error, rows, fields) => {
    if (error) throw error;
    console.log('data: ', rows);
  });

conn.query(`INSERT INTO space (space_name, menu, info) 
  VALUES (?, 'usage', '{"intro" : "개인 연습을 할 수 있어요", "content" : [{"title":"상시 예약", "body" : {"head":"어쩌구 저쩌구", "list" : ["어쩌구 저쩌구1", "어쩌구 저쩌구 2"]}}]}');`, [space],
  (error, rows, fields) => {
    if (error) throw error;
    console.log('data: ', rows);
  });


conn.query(`INSERT INTO space (space_name, menu, info) 
  VALUES (?, 'caution', '{"intro" : "개인 연습을 할 수 있어요", "content" : [{"title":"상시 예약", "body" : {"head":"어쩌구 저쩌구", "list" : ["어쩌구 저쩌구1", "어쩌구 저쩌구 2"]}}]}');`, [space],
  (error, rows, fields) => {
    if (error) throw error;
    console.log('data: ', rows);
  });
})


  }
};

module.exports = set_db;

