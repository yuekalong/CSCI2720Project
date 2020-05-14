const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const FavoriteList = require('../../model/favoriteList');
const Location = require("../../model/location");
const User = require("../../model/user");

//add
router.put('/addfav', (req, res) => {
    var favorite = req.body.favorite; //should be a location
    var userid = req.session.userID;
    var currentUser = User.findOne({ userID: userid });
    await FavoriteList.updateOne(
        {_id:currentUser._id},
        { "$push" :{ favorite: favorite._id } }, //pushing a _id to the favorite array
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
                });
            }
        }
    );
})

//get
//not yet finish
router.get('/getFav', async (req, res) => {
    let data = []
    FavoriteList
        .find()
        .populate('favorite')
        .exec(function(err, loc){
                if(loc === null)
                    return "No favorite location.";
                else if (err)
                    return "ERROR find favorite location.";
                else{
                   return; //......
                }
            })
    return res.send({
        success: true,
        data: data, //return a list of location.
    });
});

//del: update the list by remove one element.
router.put('/delfav', async (req, res) => {
    var favorite = req.body.favorite; //should be location
    var userid = req.session.userID;
    var currentUser = User.findOne({ userID: userid });
    await FavoriteList.updateOne(
        {_id:currentUser._id},
        { $pull :{ favorite: { $elemMatch: { _id : favorite._id } } } }, //pulling a _id to the favorite array
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
                });
            }
        }
    );
})

module.exports = router;