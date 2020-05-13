import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Button, Container } from "react-bootstrap";

import FlushDataCard from "../components/admin/FlushDataCard";
import CRUDLocation from "../components/admin/CRUDLocation";
import CRUDUser from "../components/admin/CRUDUser";

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
          <Navbar.Brand>FoodRoundCU</Navbar.Brand>
          <span className="text-info font-weight-bold">Admin Page</span>

          <Link to="/">
            <Button>Logout</Button>
          </Link>
        </Navbar>
        <Container fluid>
          <br />
          <FlushDataCard />
          <br />
          <CRUDLocation />
          <br />
          <CRUDUser />
        </Container>
      </div>
    );
  }
}

export default AdminPage;
