/* 
Filename: Server-side app config
Name: Fahmid Ovi
Student ID: 301216822
*/

import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

//import db package
import mongoose from 'mongoose';

//import modules for authentication
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// modules for JWT support 
import cors from 'cors';

// define authentication objects
let localStrategy = passportLocal.Strategy;

// import user model
import User from '../Models/user';

//import the router data
import indexRouter from '../Routes/index';
import contactListRouter from '../Routes/contact-list';
import authRouter from '../Routes/auth';

const app = express();

// DB configuration
import * as DBConfig from './db';
mongoose.connect(DBConfig.RemoteURI || DBConfig.LocalURI);

// Listen for connection or errors
const db = mongoose.connection;
db.on("open", function()
{
  console.log(`Connected to MongoDB at: ${(DBConfig.RemoteURI) ? DBConfig.HostName : "localhost"}`);
});

db.on("error", function()
{
  console.error(`Connection Error`);
});

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors()); // adds CORS (cross-origin resource sharing) to the config

// setup express session
app.use(session({
    secret: DBConfig.Secret,
    saveUninitialized: false,
    resave: false 
}));

// setup flash
app.use(flash());

//Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// implement the auth strategy
passport.use(User.createStrategy());

// setup User serialization and deserialization (encoding and decoding)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use routes
app.use('/', indexRouter);
app.use('/', contactListRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request, res: express.Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title : 'Error 404'});
});

export default app;