<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById("app"));
=======
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";


import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";


import MainPage from './views/MainPage.js';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/MainPage" render={props => <MainPage  {...props} />} />
      <Redirect to="/MainPage" />
    </Switch>
  </BrowserRouter>,

  document.getElementById('root')
);

>>>>>>> 08fc44d3fac62bcd6e36f1726d93fbc4595ed080
