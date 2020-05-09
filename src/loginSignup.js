import React from "react";
class App extends React.Component {
  render(){
    return(<div className='popup_inner'>
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
        </Form>
        </Tab>
      </Tabs>
    </div>
  );
  }
}
