import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Button, Container } from "react-bootstrap";

import FlushDataCard from "../components/admin/FlushDataCard.js";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar
          className="shadow justify-content-between"
          bg="light"
          expand="lg"
        >
          <Navbar.Brand>FoodRoundCU</Navbar.Brand>
          <span className="text-info font-weight-bold">Admin Page</span>

          <Link to="/">
            <Button>Logout</Button>
          </Link>
        </Navbar>
        <Container className="container-fluid">
          <FlushDataCard />
        </Container>
      </div>
    );
  }
}

export default AdminPage;
