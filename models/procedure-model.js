const db = require('../db/database');
const Procedure = {};

Procedure.findAll = () => {
  console.log('Procedure Query');
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM procedures', (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}

Procedure.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM procedures
      WHERE id = ?`, [id],
      (err, results, fields) => {
        if (err) throw err
        resolve(results);
      });
  });
}

module.exports = Procedure;
