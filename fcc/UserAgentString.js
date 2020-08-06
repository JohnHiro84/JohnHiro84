var express = require('express');
var app = express();
var useragent = require('express-useragent');
var ip = require("ip");



//Project - Request Header Parser Microservice

app.use(useragent.express());

//This route returns a json object with the IP address, language and
//useragent source information
app.get('/IpLangUserAgentSource', function(req, res){

    console.log("from route /IpLangUserAgentSource");
    console.log(req.headers["accept-language"]);

    //console.log(req.connection.remoteAddress);


    console.log ( ip.address() );

    //console.log(req.ip);
    //console.log('figuringoutIp');

    console.log(req.useragent.source);

    res.json({
      ipaddress: ip.address(),
      language: req.headers["accept-language"],
      software: req.useragent.source
    });
});


app.listen(3000, () => console.log('listening on port 3000'));
