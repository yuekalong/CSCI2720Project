# CSCI2720 Project
## New Update
If you would like to try the server on your VM, you need to the following changes:
1. In server.js:
```
var dbUri = "mongodb://[username]:[pwd]@127.0.0.1:27017/[username]?authSource=[username]&compressors=snappy&gssapiServiceName=mongodb";
```
&&
```
app.listen([your port], function(err) {
```

2. In webpack.config.js:
change:
```
entry: [
    'webpack-hot-middleware/client',
    './src/index.js',
  ],
```
to
```
entry: [
    'webpack-hot-middleware/client?path=http://csci2720.cse.cuhk.edu.hk/[your port]/__webpack_hmr',
    './src/index.js',
  ],
```
3. every component with ajax:

change:
```
const post = "[your port]"
```
## Components with ajax
1. LoginContainer
2. App.js
