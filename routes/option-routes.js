const express = require('express');
const optionRouter = express.Router();
const optionController = require('../controllers/option-controller');
const auth = require('../middlewares/auth/auth');

optionRouter.post('/option', auth.loginRequired, optionController.create);
optionRouter.get('/option-edit/:id', auth.loginRequired, optionController.edit);
optionRouter.post('/option/:id', auth.loginRequired, optionController.update);
optionRouter.delete('/option/:id', auth.loginRequired, optionController.delete);

module.exports = optionRouter;
