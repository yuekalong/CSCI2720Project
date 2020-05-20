var path = require("path");
var express = require("express");
var webpack = require("webpack");
var config = require("./webpack.config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();
const xmlparser = require('express-xml-bodyparser');
app.use(xmlparser());

// webpack setting
var compiler = webpack(config);
app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  })
);
app.use(require("webpack-hot-middleware")(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db setting
var dbUri =
"mongodb+srv://jackyNg:jackyng@cluster0-7hx7m.gcp.mongodb.net/test?retryWrites=true&w=majority";

//for my test only
  // var dbUri =
  //  "mongodb+srv://JackyChun:qwer1234@cluster0-wt6nl.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true";
  
  mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var db = mongoose.connection;
mongoose.set("useCreateIndex", true);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection is opened...");
});

// session setting
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: "csci2720",
    store: new MongoStore({ url: dbUri }),
    cookie: { maxAge: 60 * 10000 },
    saveUninitialized: false,
    resave: false,
  })
);

// router
const locations = require("./routes/api/locations");
const users = require("./routes/api/users");
const flists = require("./routes/api/favoriteLists");
const admins = require("./routes/api/admins");
const lclists = require("./routes/api/locationCommentLists");
const comments = require("./routes/api/comments");

app.use("/api/locations", locations);
app.use("/api/users", users);
app.use("/api/favoriteLists", flists);
app.use("/api/admins", admins);
app.use("/api/locationCommentLists", lclists);
app.use("/api/comments", comments);

// Request
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(2050, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Listening at http://localhost:2050");
});
