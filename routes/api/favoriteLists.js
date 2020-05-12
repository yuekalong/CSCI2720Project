const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FavoriteList = require('../../model/favoriteList');

router.get('/getFav', (req, res) => {
    let data = FavoriteList.find().exec();
    return res.send({
        success: true,
        data: data,
    });
});

module.exports = router;