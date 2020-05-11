var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  adminID: mongoose.ObjectId,
  username: String,
  password: String,
});

module.exports = mongoose.model("Admin", AdminSchema);
