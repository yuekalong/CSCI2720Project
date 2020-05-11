import React from "react";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";

//Other Component:
import LoginContainer from "../components/LoginContainer.js"

const port = "";

class LoginPage extends React.Component {
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
    <React.Fragment>
      <LoginContainer />
    </React.Fragment>
  );
  }
};

export default LoginPage;
