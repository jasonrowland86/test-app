const db = require('../db/database');
const Options = {};

Options.findAll = () => {
  console.log('Options Query');
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Options', (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}

Options.findById = (id) => {
  console.log('Single Options Query');
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM Options
      WHERE id IN (?)
      `, [id], (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}

Options.create = (options) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO Options
      (name, description, price, service_id)
      VALUES (?, ?, ?, ?)
      `, [options.name, options.description, options.price, options.service_id],
    (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
    console.log(options);
  });
}

Options.update = (options, id) => {
  console.log("update model");
  console.log(options);
  console.log(id);
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE Options SET ? WHERE ?
    `, [{name: options.name, description: options.description, price: options.price}, {id: id}],
    (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}

Options.destroy = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    DELETE FROM Options
    WHERE id IN (?)
  `, [id], (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}


module.exports = Options;
