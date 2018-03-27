const express = require('express');
const authRouter = express.Router();
const passport = require('../middlewares/auth/local');
const auth = require('../middlewares/auth/auth');
const providerController = require('../controllers/provider-controller');

authRouter.get('/login', auth.loginRedirect, (req, res) => {
  res.render('login', {
    message: 'Log In Page',
    user: req.user
  });
});

authRouter.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Name or password invalid', successFlash: 'Logged in!'}), (req, res) => {
  if(req.user) {
    res.redirect(req.session.prvURL || '/');
  } else {
    res.redirect('/');
  }
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

authRouter.get('/register', auth.loginRedirect, (req, res) => {
  res.render('register', {
    message: 'Register Page',
    user: req.user
  });
});

authRouter.post('/register', providerController.create);

module.exports = authRouter;
