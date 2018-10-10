const mongoose = require('mongoose');


const User = require('../models/userSchema');
const session = require('express-session');
const bcrypt = require('bcrypt');
var defaultImage = require('../defaultPicture');
var defaultPic = defaultImage.Picture;


//check if user is logged in and a session is created
exports.check_If = (req,res) => {

  // Check if an e-mail address is set in the session.
  // If it is, we will redirect to the user Logged In page.
  if(req.session.email) {
      res.redirect('/userIn');
  }
  else {
      res.render('login');
  }
};

//create a new user with a front end form
exports.sign_up = (req, res) => {
  res.render('signUp', {});

};

//post the new users email and password
exports.post_sign_up = (req, res, next) => {

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
            isUser: "yes",
            smallImage: " ",
            Image: defaultPic


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

};





//find all users, only for admin
exports.find_all_users = (req, res) => {
  if(req.session.email === "admin@admin.com"){
    User.find({ isUser : "yes" }, function (err, docs) {
      res.send(docs);
    });
  } else {
  res.render('login', {email: req.session.email, id: req.session.userid});
  }

};


//help on how to use FitnessTracker for regular users and admin
exports.the_help = (req, res) => {
  if(req.session.email === "admin@admin.com"){
    res.render('helpAdmin', {email: req.session.email, id: req.session.userid, Image: req.session.smallImage});
  } else {
    res.render('help', {email: req.session.email, id: req.session.userid, Image: req.session.smallImage});
  }

};
