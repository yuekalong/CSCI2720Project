import React from "react";
import axios from "axios";

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

//Other Component:
import LoginContainer from "./components/LoginContainer.js"
import TopBar from "./components/TopBar.js"

const port = "";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: port+'/api/users/checkLogin',
    })
    .then((res) => {
      alert(res.data);
    });
  }

  render(){
    return(
    <div>
      <LoginContainer />
      <TopBar logined={false}/>
    </div>
  );
  }
};

export default App;
