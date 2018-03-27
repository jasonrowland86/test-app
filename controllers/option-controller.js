const Option = require('../models/option-model');
const Service = require('../models/service-model');
const OptionController = {};

const async = require('async');

OptionController.create = (req, res) => {
  console.log("Option create");
  Option.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    service_id: req.body.service_id
  }).then(option => {
    console.log("Option created");
    // if(err) return err;
    // req.flash('service', 'Added Option!');
    // res.locals.message = req.flash();
    res.redirect(`/service/${req.body.service_id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

OptionController.edit = (req, res) => {
  Option.findById(req.params.id)
  .then(option => {
    console.log(JSON.stringify(option[0]));
    let datastr = JSON.stringify(option[0]);
    let data = JSON.parse(datastr);

    if (req.user) {
      console.log("req.user: " + req.user);
      let userstr = JSON.stringify(req.user);
      console.log(userstr[0]);
      let user = JSON.parse(userstr);
      console.log(user[0]);
      res.render(`./option-edit`, {
        message: 'Edit Page!!',
        option: data,
        provider: user[0]
      });
    }
  });
}

OptionController.update = (req, res) => {
  console.log("update controller");
  console.log(req.session.prvURL);
  Option.update({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    // service_id: req.body.service_id,
    // procedure_id: req.body.procedure_id,
  }, req.params.id)
  .then(() => {
    res.redirect(req.session.prvURL);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });
}

OptionController.delete = (req, res) => {
  let returnData = {};
  Option.findById(req.params.id)
  .then(option => {
    let optionStr = JSON.stringify(option[0]);
    returnData.singleOption = JSON.parse(optionStr);
    console.log("id: " + returnData.singleOption.service_id);

    Service.findById(returnData.singleOption.service_id)
    .then(data => {
      console.log("id2: " + returnData.singleOption.service_id);
      console.log(data);
      let datastr = JSON.stringify(data[0]);
      returnData.service = JSON.parse(datastr);
      console.log("service: " + returnData.service);
      console.log(returnData.service);
      if (req.user) {
        console.log("req.user: " + req.user);
        let userstr = JSON.stringify(req.user);
        console.log(userstr[0]);
        let user = JSON.parse(userstr);
        console.log(user[0]);
        //Check that the user is the provider of the service to authorize delete
        if (returnData.singleOption.service_id === returnData.service.id && returnData.service.provider_id === user[0].id) {
          Option.destroy(req.params.id)
          .then(() => {
            res.redirect(`/service/${returnData.service.id}`);
          }).catch(err => {
            console.log(err);
            res.status(500).json({ err });
          });
        } else {
          res.redirect('/login');
        }
      }
    });
  });
}

module.exports = OptionController;
