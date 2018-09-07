var express = require('express');
var app = express();
var useragent = require('express-useragent');
var ip = require("ip");
//var myip = require('quick-local-ip');
//var os = require('os');

//two parts of the node js microservices Projects
//timestamp
//request Header Parser Microservice




//Project - return time stamp

app.get('/returnTheTime', function(req, res, next) {
  req.time = new Date().toString();
  console.log("time is:" + req.time);
  console.log(typeof req.time);

next();

}, function(req, res) {
  console.log(req.time);
  res.json({"time": req.time});
});


//Project - Request Header Parser Microservice

///trying to figure out the user agent information from:
///https://github.com/biggora/express-useragent


app.use(useragent.express());

//This route returns a json object with the IP address, language and
//useragent source information
app.get('/IpLangUserAgentSource', function(req, res){

    console.log("from route /IpLangUserAgentSource");
    console.log(req.headers["accept-language"]);
    //console.log('remoteAddress:');
    //console.log(req.connection.remoteAddress);


    console.log ( ip.address() );

    //console.log('figuringoutIp');
    //console.log(req.ip);

    console.log(req.useragent.source);

    res.json({
      ipaddress: ip.address(),
      language: req.headers["accept-language"],
      software: req.useragent.source
    });
});


app.listen(3000, () => console.log('listening on port 3000'));
