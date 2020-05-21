const express = require('express');
const xml = require('xml');
const Parser = require("fast-xml-parser").j2xParser;
const router = express.Router();
const he = require('he');
const parser = new Parser(defaultOptions);

var defaultOptions = {
  attributeNamePrefix : "@_",
  attrNodeName: "@", //default is false
  textNodeName : "#text",
  ignoreAttributes : true,
  cdataTagName: "__cdata", //default is false
  cdataPositionChar: "\\c",
  format: false,
  indentBy: "  ",
  supressEmptyNode: false,
  tagValueProcessor: a=> he.encode(a, { useNamedReferences: true}),// default is a=>a
  attrValueProcessor: a=> he.encode(a, {isAttributeValue: isAttribute, useNamedReferences: true})// default is a=>a
};

const Location = require('../../model/location');

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

router.get("/", async(req, res) => {
  if(req.headers.authorization != "Bearer csci2720"){
    res.set('Authorization', 'Bearer csci2720');
    return res.status(401).send("Error: plz send request with correct authorization");
  }
  let locList =  await Location.find().exec();
  var location = [];
  locList.forEach(loc=>{
    var lat = loc.latitude.value.toString();
    var lng = loc.longitude.value.toString();
    location.push({
        name: loc.locationName,
        id: loc.locationID,
        latitude: lat,
        longitude: lng
      });
  });
  
  var result = {locations: {location: location}}
  res.set('Content-Type', 'text/xml');
  res.send(parser.parse(result));
});

router.post("/", (req, res) => {
  if(req.headers.authorization != "Bearer csci2720"){
    res.set('Authorization', 'Bearer csci2720');
    return res.status(401).send("Error: plz send request with correct authorization");
  }
  reqLoc = req.body.location;
  let newLocation = new Location({
    locationID: generateLocationID(),
    latitude: parseFloat(reqLoc.latitude[0]),
    longitude: parseFloat(reqLoc.longitude[0]),
    locationName: reqLoc.name[0],
    photo: "",
    address: []
  });
  newLocation.save((err) => {
    if (err){
      res.send(err);
    }
    else {
      res.set('Content-Type', 'text/xml');
      let result = {
        location: {
          name: reqLoc.name[0],
          id: newLocation.locationID,
          latitude: reqLoc.latitude[0],
          longitude: reqLoc.longitude[0]
        }
      }
      res.send(parser.parse(result));
    }
  });
});

router.get("/:LocID", (req, res) => {
  if(req.headers.authorization != "Bearer csci2720"){
    res.set('Authorization', 'Bearer csci2720');
    return res.status(401).send("Error: plz send request with correct authorization");
  }
  Location.findOne({locationID: req.params.LocID}, (err, loc)=>{
    if (err) res.send(err);
    else {
      if(loc ==  null){
        res.send("Data not exists!");
      }
      else{
        res.set('Content-Type', 'text/xml');
        let result = {
          location: {
            name: loc.locationName,
            id: loc.locationID,
            latitude: loc.latitude.value.toString(),
            longitude: loc.longitude.value.toString()
          }
        }
        res.send(parser.parse(result));
      }
    }
  });
});

router.put("/:LocID", (req, res) => {
  if(req.headers.authorization != "Bearer csci2720"){
    res.set('Authorization', 'Bearer csci2720');
    return res.status(401).send("Error: plz send request with correct authorization");
  }
  updatedLocation = req.body.location;
  var loc = {
    name: "",
    latitude: 0,
    longitude: 0
  };
  Location.findOne({ locationID: req.params.LocID }, async (err, originalLocation)=>{
    if(originalLocation == null) return res.send("Data not exists!");

    if(updatedLocation.name == null) loc.name = originalLocation.locationName;
    else loc.name = updatedLocation.name[0];

    if(updatedLocation.latitude == null) loc.latitude = originalLocation.latitude.value;
    else loc.latitude = parseFloat(updatedLocation.latitude[0]);

    if(updatedLocation.longitude == null) loc.longitude = originalLocation.longitude.value;
    else loc.longitude = parseFloat(updatedLocation.longitude[0]);

    const update = await Location.updateOne(
      { locationID: req.params.LocID },
      {
        latitude: loc.latitude,
        longitude: loc.longitude,
        locationName: loc.name
      }
    );
    if (update.n == 0) {
      res.send("Data not exists!");
    }
    else{
      res.set('Content-Type', 'text/xml');
      let result = {
        location: {
          name: loc.name,
          id: req.params.LocID,
          latitude: loc.latitude.toString(),
          longitude: loc.longitude.toString()
        }
      }
      res.send(parser.parse(result));
    }
  });
});

router.delete("/:LocID", async (req, res) => {
  if(req.headers.authorization != "Bearer csci2720"){
    res.set('Authorization', 'Bearer csci2720');
    return res.status(401).send("Error: plz send request with correct authorization");
  }
  const deleteData = await Location.findOneAndRemove({ locationID: req.params.LocID }, (err, deleteLoc) => {
    if (deleteLoc == null){
      res.send("Data not exists!");
    }
    else {
      res.set('Content-Type', 'text/xml');
      let result = {
        location: {
          name: deleteLoc.locationName,
          id: req.params.LocID,
          latitude: deleteLoc.latitude.value.toString(),
          longitude: deleteLoc.longitude.value.toString()
        }
      }
      res.send(parser.parse(result));
    }
  });
});



module.exports = router;
