const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res)=>{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send('Email already in use');

  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'bvn', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(user)
});

router.post('/login', (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({$or: [{email: username}, {phone: username}]})
  .then(user => {
    if(user) {
      bcrypt.compare(password, user.password, (err, result)=>{
        if(err){
          res.send(err);
        }
        if(result){
          let token = jwt.sign({firstName: user.firstName}, '56&#$*^%#BE%&Stgvf', {expiresIn: '1h'});
          res.status(200).send(`login sucessfull \n${token} \n welcome ${user.firstName} your BVN is ${user.bvn} `);
        } else {
          res.status(400).send('username or password is incorrect')
        }
      })
    } else {
      res.status(400).send('username or password is incorrect')
    }
  })
})

module.exports = router;