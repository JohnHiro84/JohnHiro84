const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const User = require('./userSchema');
const exercise = require('./exerciseSchema');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, { useMongoClient: true });

console.log(process.env.JWT_KEY);

//This version4 of fitnessTracker allows one to
//create users, find users, add new exercise entries
//able to search for a date range of exercises for a particular user
//ensure user has a valid Id before posting a new post exercise entry
//uses sessions
//login system
//looks nicer by using ejs template

//upload project
//upload restrictions

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



app.get('/checkIfLogdIn',function(req,res){

  // Check if an e-mail address is set in the session.
  // If it is, we will redirect to the user Logged In page.
  if(req.session.email) {
      res.redirect('/userIn');
  }
  else {
      res.render('/login');
  }
});


//login page (route redirects to login view)
app.get('/login',  (req, res) => {
  res.render('login', {});
});


//login users post route
app.post('/login', (req, res, next) => {

  //check if user exists in database
  User.find({ email: req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed "
      });
    }

    //compare posted password to db password
    //for compare pass in regular password test(form), the console logs will be different
    //but should return true
    bcrypt.compare(req.body.password, user[0].password ).then(function(result) {

            if (result) {
              //if passwords match give a session
              req.session.email = req.body.email;
              req.session.password = req.body.password;
              req.session.userid = user[0]._id.toString();

              res.redirect('/userIn');

            } else {
              res.status(401).json({
                message: 'Auth failed'
              });
            }
          });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            error: error
          });
        });
});


//user is logged in with a session redirected to user Logged In Route
app.get('/userIn',  (req, res) => {
  if(req.session.email) {
    res.render('loggedIn', {email: req.session.email, id: req.session.userid});

  }
  else if(!req.session.email) {
    res.redirect('/login');
  }
});




//Log the User Out and redirect to login page
app.get('/logout',function(req,res){

	// if the user logs out, destroy all of their individual session
	// information
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/login');
		}
	});

});


//help on how to use FitnessTracker for regular users and admin
app.get('/help',  (req, res) => {
  if(req.session.email === "admin@admin.com"){
    res.render('helpAdmin', {email: req.session.email, id: req.session.userid});
  } else {
    res.render('help', {email: req.session.email, id: req.session.userid});
  }

});


//create a new user with a front end form
app.get('/signupUser',  (req, res) => {
  res.render('signUp', {});

});


//post new user information
app.post('/signupUser', (req, res, next) => {

  //check if potential new users email allready exists in database
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length >= 1){
      return res.status(409).json({
        message: 'This eMail address allready exists in the database'
      });
    } else {

      //make a new user and hash password
      bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error){
          return res.status(500).json({
            error: error
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            isUser: "yes"
          });
          user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: 'User created'
            });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
              error: error
            });
          });
        }
      })
    }
  })

}

);

//find all users, only for admin
app.get('/findAllUsers',  (req, res) => {
  if(req.session.email === "admin@admin.com"){
    User.find({ isUser : "yes" }, function (err, docs) {
      res.send(docs);
    });
  } else {
  res.render('login', {email: req.session.email, id: req.session.userid});
  }

});



//front end to post a new exerise
app.get('/postUserExercise',  (req, res) => {
  if(req.session.email) {
    res.render('postExercise', {email: req.session.email, id: req.session.userid});
  }
  else if(!req.session.email) {
    res.redirect('/login');
  }
});

//post a new exercise record into the database
app.post('/postUserExercise', (req, res, next) => {
  //let Id = req.params.userId;

        if(req.session.email){

          //create new exercise record in db
          const exerciseRecord = new exercise({
            _id: new mongoose.Types.ObjectId(),
            user: req.session.userid,
            duration: req.body.duration,
            description: req.body.description,
            date: req.body.date,
            isExercise: "yes"
          });
          exerciseRecord.save()
          .then(result => {
            console.log(result);
            res.status(201).json({
            message:"created exercise entry successfully"
            })
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
              error:error
            });
          });

   // });

 } else {
   res.json({message: "Please login first"});
 }

});

//front end to search users exerises by front end form for a date range
app.get('/loggedinUserSearchbyDateForm2',  (req, res) => {
  if(req.session.email) {
    res.render('beginSearch', {email: req.session.email, id: req.session.userid});
  }
  else if(!req.session.email) {
    res.redirect('/login');
  }

});


//search for date range of exercises for a partiular user with a form
//show with a ejs template

app.post('/loggedinUserSearchbyDateForm2', (req, res, next) => {
  if(req.session.email) {
    let id = req.session.userid;

    //set variables to be passed into ejs view
    let email = req.session.email;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    //find exercise docs in database
    exercise.find({
      date: {
          $gte: req.body.startdate,
          $lt: req.body.enddate
      }, user: id
    }, function (err, docs) {

          if (!docs){
            res.json({"error": "No records found"});
            next();
          } else if (docs){
            res.render('SearchResults', {entirety: docs,
              id: id,
              email: email,
              startdate: startdate,
              enddate: enddate});
          }

        });

        }   else if(!req.session.email) {
              res.redirect('/login');
            }
});

//get all exercise records for an individual user

app.get('/loggedinUser/:userId', (req, res, next) => {
  if(req.session.email) {
    let Id = req.params.userId;
    exercise.find({ isExercise : "yes", user: Id }, function (err, docs) {

      res.render('AllExercises', {entirety: docs,
        id: Id,
        email: req.session.email,
      });
    });
  }
  else if(!req.session.email) {
    res.redirect('/login');
  }
});


app.listen(3000, () => console.log('listening on port 3000'));
