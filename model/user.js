var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userID: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    home: {type: [Number], required: false, default: [114.206657,22.419589]}
});

module.exports = mongoose.model('User', UserSchema);
