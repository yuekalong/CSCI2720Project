const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("../../model/admin");
const Location = require("../../model/location");
const User = require("../../model/user.model");

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
      return res.send(result);
    })
    .then(() => {})
    .catch((error) => {
      return res.send(error);
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
  return res.send(restaurant);
});

// R - read location data
router.get("/readLocation", async (req, res) => {
  let result = await Location.find().exec();
  return res.send(result);
});

// U - update location data
router.put("/updateLocation", async (req, res) => {
  const updatedLocation = JSON.parse(req.body.obj);
  console.log(updatedLocation);
  const update = await Location.updateOne(
    { locationID: updatedLocation.locationID },
    {
      latitude: updatedLocation.latitude,
      longitude: updatedLocation.longitude,
      locationName: updatedLocation.locationName,
      photo: updatedLocation.photo,
      address: updatedLocation.address,
      phoneNum: updatedLocation.phoneNum,
      rating: updatedLocation.rating,
    }
  );
  console.log(update);
  if (update.n == 0)
    return res.send("Cannot update: Invalid edit format or data not exists!");
  else return res.send(updatedLocation);
});
// D - delete location data
router.delete("/deleteLocation/:locationID", async (req, res) => {
  const locationID = req.params.locationID;

  const deleteData = await Location.deleteOne(
    { locationID: locationID },
    (err) => {
      if (err) return res.send(err.message);
    }
  );

  if (deleteData.n == 0)
    return res.send("Cannot delete: Invalid data format or data not exists!");
  else return res.send("Success");
});

// 3. CRUD user data (username and password only) in the local database

// C - create user data
router.post("/createUser", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const saltRounds = 10;
  // hash the password
  bcrypt.hash(password, saltRounds).then((hash) => {
    const hashedPassword = hash;
    User.find({}, "userID")
      .sort({ userID: -1 })
      .limit(1)
      .exec(function (err, maxIdUser) {
        if (err) res.send(err);
        else {
          var maxId = 0;
          if (maxIdUser.length == 1) {
            maxId = maxIdUser[0].userID;
          }
          var user = new User({
            userID: maxId + 1,
            username: username,
            password: hashedPassword,
          });
          user.save(function (err) {
            if (err) {
              res.send("username used");
            } else {
              res.send("createUser successfully");
            }
          });
        }
      });
  });
});

// R - read user data
router.get("/readUser", async (req, res) => {
  let result = await User.find().exec();
  return res.send(result);
});

// U - update user data
router.put("/updateUser", async (req, res) => {
  const userID = req.body.userID;
  const updatedUsername = req.body.username;
  const updatedPassword = req.body.password;
  const theUser = await User.findOne({ userID: userID });
  let update;
  if (updatedPassword == theUser.password) {
    update = await User.updateOne(
      { userID: userID },
      {
        username: updatedUsername,
        password: updatedPassword,
      }
    );
  } else {
    const password = await bcrypt.hash(updatedPassword, 10);
    update = await User.updateOne(
      { userID: userID },
      {
        username: updatedUsername,
        password: password,
      }
    );
  }
  if (update.n == 0)
    return res.send("Cannot update: Invalid edit format or data not exists!");
  else return res.send("updated user");
});

// D - delete user data
router.delete("/deleteUser/:userID", async (req, res) => {
  const userID = req.params.userID;

  const deleteData = await User.deleteOne({ userID: userID }, (err) => {
    if (err) return res.send(err.message);
  });
  console.log(deleteData);
  if (deleteData.n == 0)
    return res.send("Cannot delete: Invalid data format or data not exists!");
  else return res.send("Success");
});

// 4. Obtain location data from CSV file upload (sample needs to be provided for user on data format)

// 5. Log out as admin

module.exports = router;
