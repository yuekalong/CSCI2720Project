import React from "react";
import axios from "axios";

import { Card, Button, Modal } from "react-bootstrap";

class CRUDUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Card style={{ width: "100%" }}>
          <Card.Title>User</Card.Title>
          <Card.Body></Card.Body>
        </Card>
      </div>
    );
  }
}

export default CRUDUser;
