var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userID: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    home: {type: Array, required: false, default: ''}
});

module.exports = mongoose.model('User', UserSchema);
