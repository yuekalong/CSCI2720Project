import React from "react";

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


import "../css/LoginSignupPopup.css";

class LoginSignupPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', username: '', emailSignup: '', passwordSignup: ''};

    this.emailInputLogin = this.emailInputLogin.bind(this);
    this.passwordInputLogin = this.passwordInputLogin.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);

    this.nameInputSignup = this.nameInputSignup.bind(this);
    this.emailInputSignup = this.emailInputSignup.bind(this);
    this.passwordInputSignup = this.passwordInputSignup.bind(this);
    this.SignupSubmit = this.SignupSubmit.bind(this);

    this.closeblock = this.closeblock.bind(this);
  }

  emailInputLogin(e) {
    this.setState({email: e.target.value});
  }

  passwordInputLogin(e) {
    this.setState({password: e.target.value});
  }

  loginSubmit(e) {
    alert('Login\n' + '\nEmail: ' + this.state.email + '\nPassword: ' + this.state.password);
    e.preventDefault();
  }

  nameInputSignup(e) {
    this.setState({username: e.target.value});
  }

  emailInputSignup(e) {
    this.setState({emailSignup: e.target.value});
  }

  passwordInputSignup(e) {
    this.setState({passwordSignup: e.target.value});
  }

  SignupSubmit(e) {
    alert('Sign Up\n' + 'Username: ' + this.state.username + '\nEmail: ' + this.state.emailSignup + '\nPassword: ' + this.state.passwordSignup);
    e.preventDefault();
  }

  closeblock(){
    this.props.closeloginSigup();
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
        <Tabs defaultActiveKey="login" id="loginSignupTabs">
          <Tab eventKey="login" title="Login">
          <Form onSubmit={this.loginSubmit}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.emailInputLogin}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.passwordInputLogin}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick = {this.closeblock}>
              Cancel
            </Button>
          </Form>
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
          <Form onSubmit={this.SignupSubmit}>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Set username" onChange={this.nameInputSignup}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" onChange={this.emailInputSignup}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Set password" onChange={this.passwordInputSignup}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick = {this.closeblock}>
              Cancel
            </Button>
          </Form>
          </Tab>
        </Tabs>
        </div>
      </div>
    );
  }
}

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
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">FoodRoundCU</Navbar.Brand>
          <Nav className="mr-auto">
          </Nav>
          <Button onClick={() => this.loginSignupPopup()}>Login / Sign Up</Button>
      </Navbar>
      {this.state.showPopup ? <LoginSignupPopup closeloginSigup={() => this.loginSignupPopup()}/> : null}
    </React.Fragment>
  );
  }
};

export default App;
