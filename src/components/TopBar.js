import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import { Button } from "react-bootstrap";
import SearchIcon from '@material-ui/icons/Search';

import SearchBar from "./SearchBar.js";
class TopBar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      searchbar: false,
    };
  }

  render(){
    return(
      <div>
        {this.props.logined ? 
          <Navbar className="shadow" bg="light" expand="lg">
            <Navbar.Brand href="#/MainPage">FoodRoundCU</Navbar.Brand>
            <SearchIcon />
            <SearchBar />
            <Link to="/"><Button>Logout</Button></Link>
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