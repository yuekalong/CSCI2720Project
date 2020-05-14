const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

let User = require('../../model/user');
let FavList = require('../../model/favoriteList');

router.post("/signup", (req, res) => {
  var data = req.body;
  console.log(data);
  const saltRounds = 10;
  // hash the password
  bcrypt.hash(data.password, saltRounds).then((hash) => {
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

        var favList = new FavList({
          userID: maxId + 1
        });

        user.save(function(err){
          if (err) {
            res.send("usernameUsed");
          }
          else {
            favList.save(function(err){
              if (err) {
                res.send("Favorite list error");
              }
              else {
                res.send("signup done");
              }
            });
          }
        });
      }
    });
  });
});

router.post("/login", (req, res) => {
  var data = req.body;
  console.log(req.body);
  User.findOne({ username: data.username }, (err, user) => {
    if (user == null) res.send("Username Not Found");
    else {
      bcrypt.compare(data.password, user.password, (err, result) => {
        if (result == true) {
          req.session.regenerate(function (err) {
            if (err) res.send("Login Fail");
            else {
              req.session.userID = user.userID;
              req.session.user = data.username;
              req.session.userType = "user";
              res.send("Login Success");
            }
          });
        } else res.send("Password Not Correct");
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


router.put("/updateHome", async (req,res)=>{
  console.log(req.body);
  var coord = req.body.home;
  var userid = req.session.userID;
  var currentUser = User.findOne({ userID: userid });
  await User.updateOne(
      {_id:currentUser._id},
      { $set :{ home: req.body.home } },
      function(err){
        if(err){
          return res.send({
            error: err,
            success:false
          })
        }
        else{
          return res.send({
            success: true,
            homeCoord: coord
          });
        }
      }
    );
});

router.get("/getHome", async (req, res)=>{
  let result = await User.findOne({userID: req.session.userID}).exec();
  return res.send({
    success: true,
    data: result,
  });
})

module.exports = router;
