const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Ultima8163',
//   database: 'testdb'
// });
//
// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to database!!!');
// });

// db.end();

const pool = mysql.createPool({
  connectionLimit: '',
  host: 'localhost',
  user: 'root',
  password: 'Your mysql password here',
  database: 'Your database name here'
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to database!!!');
});

module.exports = pool;
