import React from "react";
import axios from "axios";

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

//Other Component:
import LoginContainer from "./components/LoginContainer.js"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showPopup: false};
    this.loginSignupPopup.bind(this);
  }

  loginSignupPopup(){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render(){
    return(
    <div>
      <LoginContainer />
      <Navbar className="shadow" bg="light" expand="lg">
        <Navbar.Brand href="#">FoodRoundCU</Navbar.Brand>
      </Navbar>
    </div>
  );
  }
};

export default App;
