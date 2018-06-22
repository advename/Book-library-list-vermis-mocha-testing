const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Encrypt user password before saving to db
UserSchema.pre("save" , function(next){
  let user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  })
});

let User = mongoose.model("User" , UserSchema);

module.exports = User;
