const db = require('../db/database');
const Service = {};

Service.findAll = () => {
  console.log('Service Query');
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Services', (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}

// Service.findALLByProvider = (ids) => {
//   console.log('Service Query');
//   console.log(ids);
//   return new Promise((resolve, reject) => {
//     db.query(`
//       SELECT * FROM Services
//       WHERE provider_id IN (?)
//       `, [ids], (err, results, fields) => {
//       if (err) throw err
//       resolve(results);
//     });
//   });
// }
//
// Service.findALLByProcedure = (ids) => {
//   console.log('Service Query');
//   return new Promise((resolve, reject) => {
//     db.query(`
//       SELECT * FROM Services
//       WHERE procedure_id IN (?)
//       `, [ids], (err, results, fields) => {
//       if (err) throw err
//       resolve(results);
//     });
//   });
// }

Service.findById = (id) => {
  console.log('Single Service Query');
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM Services
      WHERE id IN (?)
      `, [id], (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}

Service.create = (service) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO Services
      (name, price, procedure_id, provider_id, description)
      VALUES (?, ?, ?, ?, ?)
      `, [service.name, service.price, service.procedure_id, service.provider_id, service.description],
    (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
    console.log(service);
  });
}

Service.update = (service, id) => {
  console.log("put model");
  console.log(service);
  console.log(id);
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE Services SET ? WHERE ?
    `, [{name: service.name, price: service.price, description: service.description}, {id: id}],
    (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}

Service.destroy = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
    DELETE FROM Services
    WHERE id IN (?)
  `, [id], (err, results, fields) => {
      if (err) throw err
      resolve(results);
    });
  });
}


module.exports = Service;
