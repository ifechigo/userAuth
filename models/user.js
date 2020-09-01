const Joi = require('joi');
const mongoose = require('mongoose');


const User = mongoose.model('User', new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  bvn: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 1024
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  }
}, {timestamps: true}));

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(10).max(50).required(),
    dateOfBirth: Joi.date().required(),
    bvn: Joi.number().min(10000000000).max(999999999999).required(),
    password: Joi.string().min(8).max(255).required()
  };
  
  return Joi.validate(user, schema);
}



exports.User = User;
exports.validate = validateUser;
