
const mongoose = require('mongoose');



const exerciseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user:  {type: String, required: true},
  description: {type: String },
  duration: {type: String},
  date: {type: String},
  isExercise: {type: String, required: true}

});

let exercise = mongoose.model('exercise', exerciseSchema);
module.exports = exercise;
