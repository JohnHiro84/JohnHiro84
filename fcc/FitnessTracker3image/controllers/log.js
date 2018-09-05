const mongoose = require('mongoose');


const User = require('../models/userSchema');
const session = require('express-session');
const bcrypt = require('bcrypt');


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

//'/userIn'


//user is logged in with a session redirected to user Logged In Route
exports.User_In = (req, res) => {
  if(req.session.email) {
    res.render('loggedIn', {email: req.session.email, id: req.session.userid, Image: req.session.smallImage});

  }
  else if(!req.session.email) {
    res.redirect('/log/login');
  }
};



//login page
exports.Log_In = (req, res) => {
  res.render('login', {});
};


//post the login email and password
exports.Post_Log_In = (req, res, next) => {

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

              //setting the smallImage
              req.session.smallImage = user[0].Image;
              console.log("commented out: req.session.smallImage");
              console.log("-----------------");
              res.redirect('/log/userIn');

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
};


//logout
exports.log_out = (req,res) => {

	// if the user logs out, destroy all of their individual session
	// information
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/log/login');
		}
	});

};
