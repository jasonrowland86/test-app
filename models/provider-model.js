const db = require('../db/database');
const Provider = {};

Provider.findAll = () => {
  console.log('Provider Query');
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM providers', (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}

Provider.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM providers
      WHERE id = ?`, [id],
      (err, results, fields) => {
        if (err) throw err
        resolve(results);
      });
  });
}

Provider.findByProviderName = (username) => {
  console.log('Provider Query');
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM providers
      WHERE name = ?`, [username],
      (err, results, fields) => {
        if (err) throw err
        resolve(results);
      });
  });
}

Provider.create = (provider) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO providers
      (name, password_digest)
      VALUES (?, ?)
      `, [provider.name, provider.password_digest],
      (err, results, fields) => {
        if (err) throw err
        resolve(results);
      });
      console.log(provider);
  });
}

module.exports = Provider;
