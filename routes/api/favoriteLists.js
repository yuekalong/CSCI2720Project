const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const FavoriteList = require('../../model/favoriteList');
const Location = require("../../model/location");
const User = require("../../model/user");

router.get('/getFav', async (req, res) => {
    let data = []
    FavoriteList
        .find()
        .populate('favorite')
        .populate({
            path: 'userID', 
            match: {_id: {$eq: req.userID}}
        })
        .exec(function(err, loc){
                if(loc === null)
                    return "No favorite location.";
                else if (err)
                    return "ERROR find favorite location.";
                else{
                    data.push()
                }
            })
    return res.send({
        success: true,
        data: data,
    });
});

router.post('/addLocation', (req, res) => {
    req.body.userID
})

module.exports = router;