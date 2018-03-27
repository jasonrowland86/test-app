const Service = require('../models/service-model');
const Options = require('../models/option-model');
const Procedure = require('../models/procedure-model');
const Provider = require('../models/provider-model');
const ServiceController = {};

const async = require('async');

ServiceController.index = (req, res) => {
  req.session.prvURL = '/service';
  let returnData = {};

  async.parallel([
    (done) => {
      Service.findAll()
      .then(services => {
        returnData.allServices = services;
        done();
      });
    },
    (done) => {
      Provider.findAll()
      .then(providers => {
        returnData.providers = providers;
        done();
      });
    },
    (done) => {
      Procedure.findAll()
      .then(procedures => {
        returnData.procedures = procedures;
        done();
      });
    },
  ], function(err) {
    if (req.user) {
      console.log("req.user: " + req.user);
      let userstr = JSON.stringify(req.user);
      console.log(userstr[0]);
      let user = JSON.parse(userstr);
      console.log(user[0]);
      res.render('service', {
        message: 'Service Page!!!!!',
        services: returnData.allServices,
        providers: returnData.providers,
        procedures: returnData.procedures,
        provider: user[0]
      });
    } else {
      res.render('service', {
        message: 'Service Page!!!!!',
        services: returnData.allServices,
        providers: returnData.providers,
        procedures: returnData.procedures,
        provider: null
      });
    }
  });
}

ServiceController.single = (req, res) => {
  console.log(req.session);
  req.session.prvURL = `/service/${req.params.id}`;
  let returnData = {};

  async.parallel([
    (done) => {
      console.log("single controller");
      Service.findById(req.params.id)
      .then(data => {
        console.log(JSON.stringify(data[0]));
        let datastr = JSON.stringify(data[0]);
        let service = JSON.parse(datastr);
        returnData.service = service;
        done();
      });
    },
    (done) => {
      Options.findAll()
      .then(data => {
        console.log(data);
        console.log(JSON.stringify(data));
        let datastr = JSON.stringify(data);
        let options = JSON.parse(datastr);
        // options = options.filter(option =>
        //   option.service_id === returnData.service.id
        // )
        returnData.options = options;
        console.log(returnData.options);
        done();
      });
    }
  ], function(err) {
    if (req.user) {
      console.log("req.user: " + req.user);
      let userstr = JSON.stringify(req.user);
      console.log(userstr[0]);
      let user = JSON.parse(userstr);
      console.log(user[0]);
      res.render(`./service-id`, {
        message: 'Single Service!!',
        service: returnData.service,
        options: returnData.options,
        provider: user[0]
      });
    } else {
      res.render(`./service-id`, {
        message: 'Single Service!!',
        service: returnData.service,
        options: returnData.options,
        provider: null
      });
    }
  });
}

ServiceController.myServices = (req, res) => {
  let returnData = {};

  async.parallel([
    (done) => {
      Service.findAll()
      .then(services => {
        returnData.services = services;
        done();
      });
    },
    (done) => {
      Procedure.findAll()
      .then(procedures => {
        returnData.procedures = procedures;
        done();
      });
    },
  ], function(err) {
    if (req.user) {
      console.log("req.user: " + req.user);
      let userstr = JSON.stringify(req.user);
      console.log(userstr[0]);
      let user = JSON.parse(userstr);
      console.log(user[0]);
      res.render('./provider', {
        message: 'My Services!!',
        services: returnData.services,
        procedures: returnData.procedures,
        provider: user[0]
      });
    }
  })
}

ServiceController.create = (req, res) => {
  Service.create({
    name: req.body.name,
    price: req.body.price,
    provider_id: req.body.provider_id,
    procedure_id: req.body.procedure_id,
    description: req.body.description
  }).then(service => {
    // if(err) return err;
    // req.flash('service', 'Added Service!');
    // res.locals.message = req.flash();
    console.log('Service Created!');
    console.log(service);
    res.redirect(`/service`);
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

ServiceController.edit = (req, res) => {
  Service.findById(req.params.id)
  .then(service => {
    console.log(JSON.stringify(service[0]));
    let datastr = JSON.stringify(service[0]);
    let data = JSON.parse(datastr);

    if (req.user) {
      console.log("req.user: " + req.user);
      let userstr = JSON.stringify(req.user);
      console.log(userstr[0]);
      let user = JSON.parse(userstr);
      console.log(user[0]);
      res.render(`./service-edit`, {
        message: 'Edit Page!!',
        service: data,
        provider: user[0]
      });
    } else {
      res.render(`./service-edit`, {
        message: 'Edit Page!!',
        service: data,
        provider: null
      });
    }
  });
}

ServiceController.update = (req, res) => {
  console.log("put controller");
  Service.update({
    name: req.body.name,
    price: req.body.price,
    provider_id: req.body.provider_id,
    procedure_id: req.body.procedure_id,
    description: req.body.description
  }, req.params.id)
  .then(() => {
    res.redirect(`/service/${req.params.id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });
}

ServiceController.delete = (req, res) => {
  //Get the service being deleted
  Service.findById(req.params.id)
  .then(service => {
    console.log(JSON.stringify(service[0]));
    let serviceStr = JSON.stringify(service[0]);
    let singleService = JSON.parse(serviceStr);

    //If there is a user
    if (req.user) {
      console.log("req.user: " + req.user);
      let userstr = JSON.stringify(req.user);
      console.log(userstr[0]);
      let user = JSON.parse(userstr);
      console.log(user[0]);
      //Check that the user is the provider of the service to authorize delete
      if (singleService.provider_id === user[0].id) {
        Service.destroy(req.params.id)
        .then(() => {
          console.log('Service Deleted!');
          res.redirect('/service');
        }).catch(err => {
          console.log(err);
          res.status(500).json({ err });
        });
      } else {
        res.redirect('/service');
      }
    } else {
      res.redirect('/service');
    }
  })
}

module.exports = ServiceController;
