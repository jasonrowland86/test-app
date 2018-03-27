const bcrypt = require('bcryptjs');

function comparePass(userPassword, databasePassword) {
  console.log("comparePass");
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req, res, next) {
  console.log("loginRedirect");
  if (req.user) return res.redirect(`${req.session.prvURL}` || '/');
  return next();
}

function loginRequired(req, res, next) {
  console.log("login required");
  console.log(req.session)
  if (!req.user) return res.redirect('/login');
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired
}
