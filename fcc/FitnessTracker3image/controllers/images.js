const mongoose = require('mongoose');
var sizeOf = require('image-size');
const User = require('../models/userSchema');



//small image upload front end page
exports.upload_small_image = (req, res) => {
    if(req.session.email) {
      res.render('uploadSmallImage', {email: req.session.email, id: req.session.userid, Image: req.session.smallImage});
    }
    else if(!req.session.email) {
      res.redirect('/login');
    }
};


//upload image post Route
exports.post_small_image = (req, res, next) => {

    if(req.session.email){

          User.findById(req.session.userid, function (err, user) {
            if (err) return handleError(err);

            console.log("asdfa" + req.files.smallImage.mimetype);
            console.log(typeof req.files.smallImage.mimetype);


            if(req.files.smallImage.mimetype === "image/jpeg" ||
               req.files.smallImage.mimetype === "image/jpg" ||
               req.files.smallImage.mimetype === "image/png") {

                var img = new Buffer(req.files.smallImage.data).toString('base64');
                console.log(typeof img);

                //check image size
                var dimensions = sizeOf(req.files.smallImage.data);
                console.log(dimensions.width, dimensions.height);

                if(dimensions.width <= "400" && dimensions.height <= "400" ) {

                    user.set({ Image: img });
                    user.save(function (err, updatedUser) {
                      if (err) return handleError(err);

                                    console.log("\n3 new Image :");

                                    console.log(typeof updatedUser.Image);
                                    //console.log(updatedUser.Image);

                                    //set the session image to be the new updated image
                                    req.session.smallImage = updatedUser.Image;

                                    res.send(updatedUser);
                    });

                  } else {
                      res.send("the image is larger than 400 x 400, please upload a smaller image");
                  }


          } else {
              res.send("please upload a file with type: jpeg, jpg or png");
          };

        });

    } else {
      res.json({message: "Please login first"});
    }

};




//show small image that was uploaded for a user
//dont think this route is even used

exports.show_small_image = (req, res, next) => {

//req.body.smallImage
//onvert image to base64

        if(req.session.email){

          User.findById(req.session.userid, function (err, user) {
            if (err) return handleError(err);


            console.log("\nuser.Image");
            console.log("typeof" + typeof user.Image);
            console.log(user.Image);



            res.end(user.Image, 'base64');
            //res.end(user.Image);
          });

 } else {
   res.json({message: "Please login first"});
 }

};
