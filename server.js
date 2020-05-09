var path = require('path');
var express = require('express');
var app = express();
var webpack = require('webpack');
var config = require('./webpack.config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json());

var dbUri = 'mongodb+srv://JackyChun:qwer1234@cluster0-wt6nl.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true';
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
mongoose.set('useCreateIndex', true);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("Connection is opened...");
});

const locations = require('./routes/api/locations');
const users = require('./routes/api/users');
const flists = require('./routes/api/favoriteLists');
const admins = require('./routes/api/admins');
const lclists = require('./routes/api/locationCommentLists');
const comments = require('./routes/api/comments');

app.use('/api/locations', locations);
app.use('/api/users', users);
app.use('/api/favoriteLists', flists);
app.use('/api/admins', admins);
app.use('/api/locationCommentLists', lclists);
app.use('/api/comments', comments);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.all('*', function(req, res) {
//     res.send('hello world');
//   });

// const port = process.env.PORT || 2015;
// app.listen(port, () => console.log('port 2015'));

app.listen(2050, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:2050');
});
