const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const userModel = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST request for registration
router.post('/register', function(req, res) {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  };

  // const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  userModel.findOne({ email : email })
    .then(user => {
      if (user) {
        errors.email = "Email is already in use.";
        return res.status(400).json(errors);
      } else {
        const newUser = new userModel({
          // username : username,
          email : email,
          password : password
        });
        // salted hash of password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw (err);
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });
      };
    });
});

// POST request for login
router.post('/login', function (req, res) {

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  };

  const email = req.body.email;
  const password = req.body.password;

  userModel.findOne({ email : email })
    .then(user => {
      if (!user) {
        errors.email = "Username/Email not found.";
        return res.status(400).json({ email : "Username/Email not found." })
      };

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // const payload = { id : user.id, username : user.username };
            const payload = { id : user.id };
            // 30 days duration
            jwt.sign(payload, keys.secret, { expiresIn : 86400 }), (err, token) => {
              res.json ({ 
                success : true, 
                token : "Bearer " + token 
              });
            };
          } else {
            errors.password = "Invalid password.";
            return res.status(400).json(errors);
          }
        });
    });
});

// dev test to grab current user
router.get('/current', passport.authenticate('jwt', { session : false}), (req, res) => {

  const id = req.body.id;
  // const username = req.body.username;
  const email = req.body.email;

  res.json({
    id : id,
    // username : username,
    email : email
  });
});


module.exports = router;