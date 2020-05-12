const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FavoriteList = require('../../model/favoriteList');

router.get('/getFav', (req, res) => {
    const data = FavoriteList.find({userID:'1'});
    res.json(data);
});

module.exports = router;