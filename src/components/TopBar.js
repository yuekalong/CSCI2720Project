import React from 'react';
import axios from 'axios';
import {Alert, Navbar, Button, Nav } from "react-bootstrap";
import { Container, Row, Col} from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';

import SearchBar from "./SearchBar.js";

class TopBar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      searchbar: false,
    };
    this.logoutFun = this.logoutFun.bind(this);
  }

  logoutFun(e){
    axios({
      method: 'post',
      url: this.props.port+'/api/users/logout'
    }).
    then((res)=>{
      if(res.data == "logout done"){
        window.location = this.props.port + "/#/";
      }
      else {
        alert("Login Fail");
      }
    })
  }

  render(){
    return(
      <div>
        {this.props.logined ?
          <Navbar className="shadow" bg="light" expand="lg">
            <Navbar.Brand href="/2050/#/MainPage">FoodRoundCU</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <SearchIcon />
            <SearchBar />
            <Navbar.Text style={{"padding": "0 15px 0 15px"}}>{this.props.username}</Navbar.Text>
            <Button onClick={this.logoutFun}>Logout</Button>
          </Navbar>
          :
          <Navbar className="shadow" bg="light" expand="lg">
            <Navbar.Brand href="#">FoodRoundCU</Navbar.Brand>
          </Navbar>
        }
      </div>
    );
  }
}

export default TopBar;
