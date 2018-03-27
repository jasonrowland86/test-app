const Procedure = require('../models/procedure-model');
const ProcedureController = {};

// ProcedureController.index = (req, res) => {
//   Procedure.findAll()
//   .then(procedures => {
//     console.log('Rendering data: ' + procedures);
//     console.log(procedures);
//     res.render('procedures', {
//       message: 'Procedure Page!!!',
//       procedures: procedures
//     });
//   })
// }

ProcedureController.single = (req, res) => {
  Procedure.findById(req.params.id)
  .then(procedure => {
    console.log(JSON.stringify(procedure[0]));
    let datastr = JSON.stringify(procedure[0]);
    let data = JSON.parse(datastr);

    console.log("req.user: " + req.user);
    let userstr = JSON.stringify(req.user);
    console.log(userstr[0]);
    let user = JSON.parse(userstr);
    console.log(user[0]);
    res.render(`./procedure`, {
      message: 'Procedure Page!!',
      procedure: data,
      provider: user[0]
    });
  });
}

module.exports = ProcedureController;
