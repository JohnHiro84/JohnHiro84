var mongoose = require('mongoose');
const counter = require('./counter');


var urlSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  origUrl:  {type: String, required: true},
  newShortUrl: {type: String },
  isUrl: {type: String, required: true},
  created_at: '',
  count: ''
});


urlSchema.pre('save', function(next) {
    console.log('running pre-save');
    var doc = this;
    counter.findByIdAndUpdate({ _id: '5b492f965d75392720c61954' }, { $inc: { count: 1 } }, function(err, counter) {
        if(err) return next(err);
        console.log("Counter information:\n ");
        console.log(counter);
        console.log(counter.count);
        doc.count = counter.count.toString();
        console.log(typeof doc.count);
        doc.newShortUrl = "http://localhost:3000/shortUrl/" + doc.count;
        doc.created_at = new Date();
        console.log(doc);
        next();
    });
});



let newUrl= mongoose.model('newUrl', urlSchema);
module.exports = newUrl;
