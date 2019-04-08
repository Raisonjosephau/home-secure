require('dotenv').load();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('./config/logger');
const morgan = require('morgan');
var firebase = require('firebase-admin');

var serviceAccount = require('./util/home-sec59-firebase-adminsdk-8rlo4-9488b35e03.json');


// const passportConfig = require('./config/_passport');
const cors = require('cors');

const db = require('./config/_db'); // Do not delete this. This is a db connection.

const indexRouter = require('./routes/index');

const authRouter = require('./urls/auth');
const profileRouter = require('./urls/profile');
const deviceRouter = require('./urls/device');
const arduinoRouter = require('./urls/arduino');
const firebaseRouter = require('./urls/firebase');
const threatsRouter = require('./urls/threat');



// Challenge Socket
var server = require('http').Server(express);
var io = require('socket.io')(server);

server.listen(80);

const { challengeSocket } = require('./socket/loginSocket');

const socketConnection = io.of('/homesecure');
challengeSocket(socketConnection);

//Firebase init
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://home-sec59..firebaseio.com'
});


const app = express();
app.use(cors());
app.use(morgan('common', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //setting middleware
app.use(express.static(path.join(__dirname, 'media'))); //setting middleware
app.use('/media', express.static(__dirname + '/media'));



app.use('/', indexRouter);
app.use('/app-auth', authRouter);
app.use('/profile', profileRouter);
app.use('/device', deviceRouter);
app.use('/iot', arduinoRouter);
app.use('/firebase', arduinoRouter);
app.use('/threats', arduinoRouter);

module.exports = app;