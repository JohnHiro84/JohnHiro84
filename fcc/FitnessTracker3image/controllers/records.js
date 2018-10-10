const mongoose = require('mongoose');
const User = require('../models/userSchema');
const exercise = require('../models/exerciseSchema');
const session = require('express-session');
const bcrypt = require('bcrypt');


//front end to search users exerises by front end form for a date range
exports.records_search = (req, res) => {
  if(req.session.email) {
    res.render('beginSearch', {email: req.session.email, id: req.session.userid, Image: req.session.smallImage});
  }
  else if(!req.session.email) {
    res.redirect('/login');
  }

};

//posting the search query
exports.records_search_go = (req, res, next) => {
  if(req.session.email) {
    let id = req.session.userid;

    //set variables to be passed into ejs view
    let email = req.session.email;


    // if(req.body.startdate && req.body.enddate){

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
              Image: req.session.smallImage,
              email: email,
              startdate: startdate,
              enddate: enddate});
          }

        });

        }   else if(!req.session.email) {
              res.redirect('/login');
            }
};

//pull all the exercises for one user
exports.all_one_users_exercises = (req, res, next) => {
  if(req.session.email) {
    let Id = req.params.userId;
    exercise.find({ isExercise : "yes", user: Id }, function (err, docs) {

      res.render('AllExercises', {entirety: docs,
        id: Id,
        email: req.session.email,
        Image: req.session.smallImage
      });
    });
  }
  else if(!req.session.email) {
    res.redirect('/login');
  }
};




//front end to post a new exerise

exports.post_exercise_begin = (req, res) => {
  if(req.session.email) {
    res.render('postExercise', {email: req.session.email, id: req.session.userid, Image: req.session.smallImage});
  }
  else if(!req.session.email) {
    res.redirect('/login');
  }
};


//post a new exercise record into the database

exports.post_exercise = (req, res, next) => {
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

};
