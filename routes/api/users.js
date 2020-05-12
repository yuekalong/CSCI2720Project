const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

let User = require('../../model/user.model');
let favList = require('../../model/favoriteList');

router.post('/signup', (req, res) => {
  var data = req.body;
  console.log(data);
  const saltRounds = 10;
  // hash the password
  bcrypt.hash(data.password, saltRounds).then(hash => {
    data.password = hash;
    User.find({}, 'userID').sort({userID: -1}).limit(1).exec(function(err, maxIdUser) {
      if (err) res.send(err);
      else{
        var maxId = 0;
        if (maxIdUser.length == 1) {
          maxId = maxIdUser[0].userID;
        }
        var user = new User({
          userID: maxId + 1,
          username: data.username,
          password: data.password
        });
        user.save(function(err){
          if (err) {
            res.send("usernameUsed");
          }
          else {
            res.send("signup done");
          }
        });
      }
    });
  });
});

router.post("/login", (req, res)=>{
  var data = req.body;
  console.log(req.body);
  User.findOne({ username: data.username }, { password: 1 }, (err, user) => {
    if (user == null) res.send("Username Not Found");
    else{
      bcrypt.compare(data.password, user.password, (err, result) => {
        if (result == true) {
          req.session.regenerate(function (err) {
            if (err) res.send("Login Fail");
            else {
              req.session.user = data.username;
              req.session.userType = "user";
              res.send("Login Success");
            }
          });
        }
        else res.send("Password Not Correct");
      });
    }
  });
});

router.post('/checkLogin', (req, res) => {
  var user = '';
  var userType = 'guest';
  if (!(req.session.user == undefined)) {
    user = req.session.user;
    userType = req.session.userType
    res.send({status: "logined", username: req.session.user});
  }
  else res.send({status: "not logined"});
});

router.post('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send("logout fail");
    }
    res.send("logout done");
  });
});




module.exports = router;
