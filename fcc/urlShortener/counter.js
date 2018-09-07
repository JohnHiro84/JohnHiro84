var mongoose = require('mongoose');



var countersSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
});

var Counter = mongoose.model('Counter', countersSchema);
module.exports = Counter;


//Counter id
//5b492f965d75392720c61954
