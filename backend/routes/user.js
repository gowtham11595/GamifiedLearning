const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            // const avatar = gravatar.url(req.body.email, {
            //     s: '200',
            //     r: 'pg',
            //     d: 'mm'
            // });
            //console.log("request = "+JSON.stringify(req.body));
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
                phone: req.body.phone,
                university:req.body.university,
                class:req.body.class
            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                emailid: user.email,
                                name: user.name,
                                scope: user.scope
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`,
                                        scope: user.scope
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/auth_me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
});

router.get('/getUsersOfCourse/:courseId', function(req, res) {
  // var token = req.headers['x-access-token'];
  // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  //
  // jwt.verify(token, 'secret', function(err, decoded) {
  //   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  //
  //
  //   //res.status(200).send(decoded);
  // });

  var courseId  = req.params.courseId;
  User.find({courseId:courseId}, function(err, users) {
     res.status(200).send(users);
   });

});

router.get('/getUsers', function(req, res) {
  const token = req.headers['authorization'].split(" ")[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    if(decoded.scope!=="Professor"){
        var errorResponse = "";
        res.status(500).send("Unauthorized Access");
    }

  User.find({}, function(err, users) {
     res.status(200).send(users);
   });
 });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;
