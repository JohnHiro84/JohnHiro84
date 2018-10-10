const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const User = require('./models/userSchema');
const exercise = require('./models/exerciseSchema');

const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();
//var sizeOf = require('image-size');

var defaultImage = require('./defaultPicture');
var defaultPic = defaultImage.Picture;

//used to try to parse multipart form file data
const fileUpload = require('express-fileupload');
app.use(fileUpload());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, { useMongoClient: true });

console.log(process.env.JWT_KEY);



//This version of fitnessTracker allows one to
//create users, find users, add new exercise entries
//ability to search for a date range of exercises for a particular user
//ensure user has a valid Id before posting a new post exercise entry
//uses sessions
//login system
//looks nicer by using ejs template

//upload image
//upload image restrictions
//attempt to use mvc architecture

//middleware to handle url encoded data
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedParser);

//middeware to use json encoded data
app.use(bodyParser.json());


app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true
}));

///////////////images routes
const imageRoutes = require('./routes/images');
const logRoutes = require('./routes/log');
const userRoutes = require('./routes/user');
const recordRoutes = require('./routes/records');

app.use('/uploadSmallImage', imageRoutes);

//this route might not even be needed
app.use('/showSmallImage', imageRoutes);

/////////////////log routes
app.use('/log', logRoutes);

////////////userRoutes
app.use('/user', userRoutes);


//////////record Routes
app.use('/records', recordRoutes);




app.listen(3000, () => console.log('listening on port 3000'));
