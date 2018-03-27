const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const Provider = require('../../models/provider-model');
const auth = require('./auth');

init();

passport.use(
  new LocalStrategy((username, password, done) => {
    Provider.findByProviderName(username)
    .then(provider => {
      let pass = provider.map(p => {return p.password_digest;});
      let strpass = pass.toString();
      console.log(strpass);
      if (!provider) {
        return done(null, false);
      }
      if (!auth.comparePass(password, strpass)) {
        return done(null, false);
      } else {
        console.log("Logged In!");
        return done(null, provider);
      }
    }).catch(err => {
      console.log(err);
      return done(err);
    });
  })
);

module.exports = passport;
