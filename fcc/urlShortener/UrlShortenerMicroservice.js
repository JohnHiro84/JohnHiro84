const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
var dns = require('dns');

const newUrl = require('./shortUrlSchema');
const counter = require('./counter');
require('dotenv').config();


app.set('view engine', 'ejs');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, { useMongoClient: true });

//middleware to handle url encoded data
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedParser);


//description
//this project is a project from freecodecamp using nodejs.
//you can enter in a webpage and get a shortened link to that webpage
//It uses nodeJs, mongoose dns lookup and ejs


//the main form entrypoint to type in long url
app.get('/UrlShortener',  (req, res) => {
  var absolutePath = path.join(__dirname, "./UrlShortenerFrontEnd.html");
  res.sendFile(absolutePath);
});



//post a new url into the db
app.post('/createUrl', (req, res, next) => {

  //check to see if the page actually exists with a dns lookup
  dns.lookup(req.body.origUrl, (error, address, family) => {
    if(error){
      console.log("there was an error, the page doesnt exist");
      res.status(404).json({
      message:"Dns lookup showed that page doesnt exist"
      })

    //if the dns lookup shows the page exists, create new record in db
    } else if (!error){
      console.log("The page exists");
      console.log("the page is connected to:"+ address);
      console.log("with the Ipv" + family + " protocol");

        //create new record in db
        const newUrl2 = new newUrl({
          _id: new mongoose.Types.ObjectId(),
          origUrl: req.body.origUrl,
          isUrl: "yes",

        });
        newUrl2.save()
        .then(result => {
          console.log(result);
          res.status(201).json({
          message:"created url entry successfully",
          "Original Url": newUrl2.origUrl,
          "New Short Link": newUrl2.newShortUrl,
          })
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            error:error
          });
        });

    }

 });

});

//find all created Urls
app.get('/findAllUrls', (req, res, next)=>{
  newUrl.find({ isUrl : "yes" }, function (err, docs) {
    if (err) return handleError(err);
    //console.log(docs);
    if (!docs){
      res.json({"error": "No records found"});
      next();
  } else if (docs){
    res.send(docs);

  }
});
})



//Using Ejs,find all created Urls and return them pretty
app.get('/findAllUrlsPretty', (req, res, next)=>{
  newUrl.find({ isUrl : "yes" }, function (err, docs) {
    if (err) return handleError(err);
    //console.log(docs);
    if (!docs){
      res.json({"error": "No records found"});
      next();
    } else if (docs){
      //res.send(docs);
      res.render('profile2', {entirety: docs});
    }
  });
})



//type in short url and get redireted to long url
app.get('/shortUrl/:short', (req, res, next)=>{
  let shortened = req.params.short
  console.log(typeof shortened);
  newUrl.findOne({ count : shortened }, function (err, newUrl) {
    if (err) return handleError(err);
    if (newUrl){

                console.log("newUrl****");
                console.log(newUrl.newShortUrl);
                console.log(newUrl.origUrl);
                console.log(typeof newUrl.origUrl);
                res.writeHead(301,
                  {Location: "https://" + newUrl.origUrl}
                );
                res.end();
          }
    else {
      console.log("that isnt a correct link");
      res.json({"error": "that isnt a working link"});
    }

  }).catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
})


//delete all the urls created
app.get('/deleteAllUrls/', function(req, res){

  newUrl.deleteMany({ isUrl: "yes" }, function(err, docs){
      if(err) res.json(err);
      else  {
        res.json({"Urls Deleted":'all records matching the following isUrl yes deleted:'});

      }

      if(!newUrl.isUrl) {
        res.json({"Urls":'No Urls Found:'})
      }
  });
});


///make Counter, only use once
// app.post('/counter', (req, res, next) => {
//
//         //create new record in db
//         const count = new counter({
//           _id: new mongoose.Types.ObjectId()
//
//         });
//         count.save()
//         .then(result => {
//           console.log(result);
//           res.status(201).json({
//           message:"created counter entry successfully"
//           })
//         })
//         .catch(error => {
//           console.log(error);
//           res.status(500).json({
//             error:error
//           });
//         });
// });


app.listen(3000, () => console.log('listening on port 3000'))
