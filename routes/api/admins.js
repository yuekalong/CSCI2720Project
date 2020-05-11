const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Admin = require("../../model/admin");

// yelp setting
const yelp = require("yelp-fusion");
const apiKey =
  "0kXUjGnFG9S7T53LaoczuYeTz24Enbnn_eNfBsgV5qiwp6iPThyQob1ye3d9oVJ-YU36wegkGLSNcKG8B0vR1EUC5vBvJVJmBGi1QIwqQ75gIzT8sos-9Lk-QRe3XnYx";
const client = yelp.client(apiKey);

// 1. Flush data, reload from the online dataset
router.get("/flushData", (req, res) => {
  const searchRequest = {
    categories: "restaurants",
    location: "The Chinese University of Hong Kong",
    radius: "1000",
  };

  client
    .search(searchRequest)
    .then((data) => {
      var len = data.jsonBody.total;
      console.log(len);
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
// 2. CRUD location data in the local database

// 3. CRUD user data (username and password only) in the local database

// 4. Obtain location data from CSV file upload (sample needs to be provided for user on data format)

// 5. Log out as admin

module.exports = router;
