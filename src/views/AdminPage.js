import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Button, Container } from "react-bootstrap";

import FlushDataCard from "../components/admin/FlushDataCard";
import CRUDLocation from "../components/admin/CRUDLocation";
import CRUDUser from "../components/admin/CRUDUser";
import ActiveChart from "../components/admin/ActiveChart";

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
          <FlushDataCard port={this.props.port}/>
          <br />
          <CRUDLocation port={this.props.port}/>
          <br />
          <CRUDUser port={this.props.port}/>
          <br />
          <ActiveChart port={this.props.port}/>
        </Container>
      </div>
    );
  }
}

export default AdminPage;
