import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Button, Container } from "react-bootstrap";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ "background-color": "#34638a" }}>
        <Navbar
          className="shadow justify-content-between"
          bg="light"
          expand="lg"
        >
          <Navbar className="shadow" bg="light" expand="lg">
            <Navbar.Brand href="#">FoodRoundCU</Navbar.Brand>
          </Navbar>
          <span className="text-info font-weight-bold">About the Project</span>

          <Link to="/">
            <Button>Back Home</Button>
          </Link>
        </Navbar>
        <Container fluid></Container>
      </div>
    );
  }
}

export default AdminPage;
