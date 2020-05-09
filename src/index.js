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

