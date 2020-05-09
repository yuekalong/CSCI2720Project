var path = require('path');
// 使用 express
var express = require('express');
var app = express();
// 使用 webpack
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);
// 將 webpack 傳入 webpack-dev-middleware 並套用至 app，同時傳入屬性，webpack 就可以被加載進來
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
// 不管你打什麼都會載入 index.html 啦
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// 監聽 8000 port，並顯示錯誤或成功
app.listen(2050, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:2050');
});
