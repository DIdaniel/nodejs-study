'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10


const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    defult: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function( next ) {
  var user = this;

  if(user.isModified('password')) {
    // 비밀번호를 암호화 시키기!!
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err)

      bcrypt.hash(user.password, salt, function(err, hash) {
          if(err) return next(err)

          user.password = hash

          next()
      });
    });  
  }  else {
    next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
  //plainPassword와 암호화된 비밀번호가 같은지 확인해야한다
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return callback(err),
    //만약 두 암호가 같다면?
    callback(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }