const express = require('express');
const router = express.Router();

const Location = require('../../models/location');

// @route GET api/locations
// @desc GET All items
// @access Public
router.get('/', (req,res)=>{
    Location.find()
    .sort({locationID: -1})
    .then(locations => res.json(location))
});

module.exports = router;