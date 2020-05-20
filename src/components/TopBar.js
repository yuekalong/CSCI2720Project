import React from 'react';
import axios from 'axios';
import {Alert, Navbar, Button, Nav } from "react-bootstrap";
import { Container, Row, Col} from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';
import {FaSearch} from 'react-icons/fa';
import SearchTable from "./SearchTable.js";

class TopBar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      searchtable: false,
    };
    this.logoutFun = this.logoutFun.bind(this);
    this.searchtableOpen = this.searchtableOpen.bind(this)
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

  searchtableOpen(){
    this.setState({
      searchtable: !this.state.searchtable
    });
  }

  render(){
    return(
      <div>
        {this.props.logined ?
          <Navbar className="shadow" bg="light" expand="lg">
            <Navbar.Brand href={this.props.port + "/#/MainPage"}>FoodRoundCU</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Button><FaSearch onClick={this.searchtableOpen}/></Button>
            <Navbar.Text style={{"padding": "0 15px 0 15px"}}>{this.props.username}</Navbar.Text>
            <Button onClick={this.logoutFun}>Logout</Button>
          </Navbar>
          :
          <Navbar className="shadow" bg="light" expand="lg">
            <Navbar.Brand href="#">FoodRoundCU</Navbar.Brand>
          </Navbar>
        }
         {this.state.searchtable && <SearchTable onClick={this.searchtableOpen} port={this.props.port}/>}
      </div>
    );
  }
}

export default TopBar;
