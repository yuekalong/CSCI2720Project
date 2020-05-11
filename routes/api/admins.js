const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Admin = require("../../model/admin");
let Location = require("../../model/location");

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
      let result = data["jsonBody"]["businesses"];

      Location.deleteMany({}, (err) => {
        if (err) return res.send(err.message);
      });
      console.log(result);
      result.forEach((restaurant) => {
        let newLocation = new Location({
          locationID: restaurant.id,
          latitude: restaurant.coordinates.latitude,
          longitude: restaurant.coordinates.longitude,
          locationName: restaurant.name,
          photo: restaurant.image_url,
          address: [
            restaurant.location.address1,
            restaurant.location.address2,
            restaurant.location.address3,
          ],
          phoneNum: restaurant.phone,
          rating: restaurant.rating,
        });
        newLocation.save((err) => {
          if (err) return res.send(err.message);
        });
      });
      res.send(result);
    })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
});

// 2. CRUD location data in the local database
// C - create location data
function generateLocationID() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  var charactersLength = characters.length;
  for (var i = 0; i < 22; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
router.post("/createLocation", (req, res) => {
  console.log(req.body);
  let restaurant = JSON.parse(req.body.obj);
  console.log(restaurant);
  let newLocation = new Location({
    locationID: generateLocationID(),
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    locationName: restaurant.locationName,
    photo: restaurant.photo,
    address: restaurant.address,
    phoneNum: restaurant.phoneNum,
    rating: restaurant.rating,
  });
  newLocation.save((err) => {
    if (err) return res.send(err.message);
  });
  res.send(restaurant);
});

// R - read location data
router.get("readLocation", (req, res) => {});
// U - update location data
router.put("updateLocation", (req, res) => {});
// D - delete location data
router.delete("deleteLocation", (req, res) => {});

// 3. CRUD user data (username and password only) in the local database

// 4. Obtain location data from CSV file upload (sample needs to be provided for user on data format)

// 5. Log out as admin

module.exports = router;
