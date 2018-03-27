const express = require('express');
const serviceRouter = express.Router();
const serviceController = require('../controllers/service-controller');
const auth = require('../middlewares/auth/auth');

serviceRouter.get('/service', serviceController.index);
serviceRouter.get('/service-edit/:id', auth.loginRequired, serviceController.edit);
serviceRouter.get('/provider', auth.loginRequired, serviceController.myServices);
serviceRouter.post('/service', auth.loginRequired, serviceController.create);
serviceRouter.get('/service/:id', serviceController.single);
serviceRouter.post('/service/:id', auth.loginRequired, serviceController.update);
serviceRouter.delete('/service/:id', auth.loginRequired, serviceController.delete);

module.exports = serviceRouter;
