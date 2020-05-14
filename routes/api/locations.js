const express = require('express');
const router = express.Router();

const Location = require('../../model/location');

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
