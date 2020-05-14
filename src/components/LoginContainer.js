import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Button, Form, Tabs, Tab, Alert} from "react-bootstrap";

import "../assets/css/LoginContainer.css";

const port = "";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameNotFoundWarning: false,
      pwdNotCorrectWarning: false,
      sigupSuccess: false,
      usernameUsed: false
    }

    this.loginSubmit = this.loginSubmit.bind(this);
    this.SignupSubmit = this.SignupSubmit.bind(this);
  }

  loginSubmit(e) {
    axios({
      method: 'post',
      url: port+'/api/users/login',
      data: {
        username: ReactDOM.findDOMNode(this.username).value,
        password: ReactDOM.findDOMNode(this.password).value
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

  SignupSubmit(e) {
    axios({
      method: 'post',
      url: port+'/api/users/signup',
      data: {
        username: ReactDOM.findDOMNode(this.usernameSignup).value,
        password: ReactDOM.findDOMNode(this.passwordSignup).value
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
              <Form.Control type="text" minLength={4} maxLength={20} placeholder="Enter Username" ref={ ref => this.username = ref }/>
              <Form.Text className="text-muted">
                The username must be a string of 4–20 characters.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" minLength={4} maxLength={20} placeholder="Password" ref={ ref => this.password = ref }/>
              <Form.Text className="text-muted">
                The password must be a string of 4–20 characters.
              </Form.Text>
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
              <Form.Control type="text" minLength={4} maxLength={20} placeholder="Set username" ref={ ref => this.usernameSignup = ref }/>
              <Form.Text className="text-muted">
                The username must be a string of 4–20 characters.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" minLength={4} maxLength={20} placeholder="Set password" ref={ ref => this.passwordSignup = ref }/>
              <Form.Text className="text-muted">
                The password must be a string of 4–20 characters.
              </Form.Text>
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
