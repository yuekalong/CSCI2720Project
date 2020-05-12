const express = require('express');
const router = express.Router();

const Location = require('../../model/location');

// @route GET api/locations
// @desc GET All items
// @access Public
router.get('/', (req,res)=>{
    Location.find()
    .sort({locationID: -1})
    .then(locations => res.json(location))
});

router.post("/loc/:locID", (req, res) => {
  Location.findOne({locationID: req.body.locID}, (err, loc)=>{
    if (err) res.send({success: false});
    else {
      res.send({
        success: true,
        data: loc,
      });
    }
  });
});

module.exports = router;
