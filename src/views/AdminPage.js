import React from "react";

import Navbar from "react-bootstrap/Navbar";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className="shadow" bg="light" expand="lg">
          <Navbar.Brand href="#">
            FoodRoundCU <span>Admin Page</span>
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default AdminPage;
