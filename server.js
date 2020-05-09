var path = require('path');

var express = require('express');
var app = express();

var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(2050, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:2050');
});
