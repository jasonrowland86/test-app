const passport = require('passport');
const Provider = require('../../models/provider-model');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serialize");
    console.log(user);
    let str = JSON.stringify(user);
    console.log(str);
    let name = JSON.parse(str);
    console.log(name);
    console.log(name[0].name);
    done(null, name[0].name);
  });

  passport.deserializeUser((username, done) => {
    console.log("deserialize " + username);
    Provider.findByProviderName(username)
    .then(provider => {
      done(null, provider);
    }).catch(err => {
      done(err, null);
    });
  });
};
