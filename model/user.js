var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userID: mongoose.ObjectId,
    username: String,
    password: String
});

module.export = mongoose.model('location', UserSchema);