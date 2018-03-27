//Initiate Express App
const express = require('express');
const app = express();

//Require Dependencies
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

require('dotenv').config();

//Set Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Static(public) Folder
app.use(express.static('public'));
// app.use('/public', express.static(__dirname + '/public'));
// app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));

//Set View Engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Set App to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//ROUTES***************
const providerController = require('./controllers/provider-controller');
const procedureController = require('./controllers/procedure-controller');
const serviceController = require('./controllers/service-controller');
const auth = require('./middlewares/auth/auth');
//Index Route
app.get('/', providerController.index);
//Procedure Routes
app.get('/procedure/:id', auth.loginRequired, procedureController.single);
//Service Routes
const serviceRoutes = require('./routes/service-routes');
app.use('/', serviceRoutes);
//Option Routes
const optionRoutes = require('./routes/option-routes');
app.use('/', optionRoutes);
//Auth Routes
const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

// const providerRoutes = require('./routes/provider-routes');
// app.use('/provider', providerRoutes);

//Use catch all at bottom of app.js
app.get('*', (req, res) => {
  const err = new Error('Not found!');
  //send response
  // res.status(404).send(err);
  // console.log(err);
  res.render('error', {
    message: 'Page not found!'
  })
});
