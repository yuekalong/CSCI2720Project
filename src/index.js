// import React from "react";
// import ReactDOM from "react-dom";
//
// // Importing the Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// ReactDOM.render(<App />, document.getElementById("app"));
// =======
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import "assets/css/bootstrap.min.css";
// import "./assets/scss/paper-kit.scss";
// import "./assets/demo/demo.css";

import MainPage from "./views/MainPage.js";
import AdminPage from "./views/AdminPage.js";
import AboutThisProjectPage from "./views/AboutThisProjectPage.js";

import App from "./App";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" render={(props) => <App {...props} />} />
      <Route path="/MainPage" render={(props) => <MainPage {...props} />} />
      <Route path="/AdminPage" render={(props) => <AdminPage {...props} />} />
      <Route
        path="/AboutThisProjectPage"
        render={(props) => <AboutThisProjectPage {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </HashRouter>,

  document.getElementById("app")
);
