const Provider = require('../models/provider-model');
const Procedure = require('../models/procedure-model');
const ProviderController = {};
const bcrypt = require('bcryptjs');

const async = require('async');

ProviderController.index = (req, res) => {
  let returnData = {};

  async.parallel([
    (done) => {
      Provider.findAll()
      .then(providers => {
        console.log('Rendering data: ' + providers.map(provider => {
          return ` ${provider.name}`;
        }));
        returnData.providers = providers;
        done();
      })
    },
    (done) => {
      Procedure.findAll()
      .then(procedures => {
        console.log('Rendering data: ' + procedures.map(procedures => {
          return ` ${procedures.name}`;
        }));
        returnData.procedures = procedures;
        done();
      })
    },
  ], function(err) {
    if (err)
    console.log(err);
    res.render('index', {
      message: 'Index Page!!!',
      providers: returnData.providers,
      procedures: returnData.procedures,
      provider: req.user
    });
  });
}

ProviderController.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  Provider.create({
    name: req.body.name,
    password_digest: hash,
  }).then(user => {
    console.log(user);
    req.login(user, (err) => {
      console.log(user);
      // if(err) return next(err);
      // req.flash('registered', 'Registered!');
      // res.locals.message = req.flash();
      res.redirect('/');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}


module.exports = ProviderController;
