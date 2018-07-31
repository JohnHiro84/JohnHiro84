
const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {  type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          },
  password: { type: String, required: true},
  isUser: {type: String, required: true}

});

let User = mongoose.model('User', userSchema);
module.exports = User;
