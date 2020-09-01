const express = require('express');
const users = require('../routes/users');
const morgan = require('morgan')

module.exports = function(app) {
  app.use(morgan('dev'))
  app.use(express.urlencoded({extended: true}))
  app.use(express.json());
  app.use('/api/users', users);

}