var path = require("path");
var express = require("express");
var webpack = require("webpack");
var config = require("./webpack.config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();

// yelp setting
var yelp = require("yelp-fusion");
var apiKey =
  "0kXUjGnFG9S7T53LaoczuYeTz24Enbnn_eNfBsgV5qiwp6iPThyQob1ye3d9oVJ-YU36wegkGLSNcKG8B0vR1EUC5vBvJVJmBGi1QIwqQ75gIzT8sos-9Lk-QRe3XnYx";
const searchRequest = {
  categories: "restaurants",
  location: "The Chinese University of Hong Kong",
  radius: "1000",
};
const client = yelp.client(apiKey);
client
  .search(searchRequest)
  .then((data) => {
    var len = data.jsonBody;
    console.log(len);
  })
  .catch((error) => {
    console.log(error);
  });

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
