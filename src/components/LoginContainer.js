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
import Alert from "react-bootstrap/Alert";

import "../assets/css/LoginContainer.css";

const port = "";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', usernameSignup: '', passwordSignup: ''};

    this.nameInputLogin = this.nameInputLogin.bind(this);
    this.passwordInputLogin = this.passwordInputLogin.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);

    this.usernameNotFoundWarning = false;
    this.pwdNotCorrectWarning = false;

    this.nameInputSignup = this.nameInputSignup.bind(this);
    this.passwordInputSignup = this.passwordInputSignup.bind(this);
    this.SignupSubmit = this.SignupSubmit.bind(this);

    this.sigupSuccess = false;
    this.usernameUsed = false;
  }

  nameInputLogin(e) {
    this.setState({username: e.target.value});
  }

  passwordInputLogin(e) {
    this.setState({password: e.target.value});
  }

  loginSubmit(e) {
    axios({
      method: 'post',
      url: port+'/api/users/login',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
    .then((res) => {
      if(res.data == "Login Success"){
        window.location = "/#/MainPage";
      }
      else if(res.data == "Username Not Found"){
        this.setState({usernameNotFoundWarning: true});
        this.setState({pwdNotCorrectWarning: false});
      }
      else if(res.data == "Password Not Correct"){
        this.setState({usernameNotFoundWarning: false});
        this.setState({pwdNotCorrectWarning: true});
      }
      else{
        alert("error");
      }
    });
    e.preventDefault();
  }

  nameInputSignup(e) {
    this.setState({usernameSignup: e.target.value});
  }

  passwordInputSignup(e) {
    this.setState({passwordSignup: e.target.value});
  }

  SignupSubmit(e) {
    axios({
      method: 'post',
      url: port+'/api/users/signup',
      data: {
        username: this.state.usernameSignup,
        password: this.state.passwordSignup
      }
    })
    .then(res=> {
      if(res.data == "signup done"){
        this.setState({sigupSuccess: true});
        this.setState({usernameUsed: false});
      }
      else if (res.data == "usernameUsed") {
        this.setState({sigupSuccess: false});
        this.setState({usernameUsed: true});
      }
      else {
        alert("error");
      }
    });
    e.preventDefault();
  }

  render() {
    return (
      <div className='homePage'>
        <div className='loginContainer'>
        <Tabs defaultActiveKey="login" id="loginSignupTabs">
          <Tab eventKey="login" title="Login" className="loginContainerTab">
          <Form onSubmit={this.loginSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={this.nameInputLogin}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.passwordInputLogin}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div style={{padding: "10px"}}></div>
            {this.state.usernameNotFoundWarning ? <Alert variant="warning">Username Not Found</Alert> : null}
            {this.state.pwdNotCorrectWarning ? <Alert variant="danger">Password Not Correct</Alert> : null}
          </Form>
          </Tab>
          <Tab eventKey="signup" title="Sign Up" className="loginContainerTab">
          <Form onSubmit={this.SignupSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Set username" onChange={this.nameInputSignup}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Set password" onChange={this.passwordInputSignup}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div style={{padding: "10px"}}></div>
            {this.state.sigupSuccess ? <Alert variant="success">Signup Success</Alert> : null}
            {this.state.usernameUsed ? <Alert variant="warning">This username have been used</Alert> : null}
          </Form>
          </Tab>
        </Tabs>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
