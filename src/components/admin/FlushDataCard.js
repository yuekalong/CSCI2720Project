import React from "react";
import axios from "axios";

import { Card, Button, Modal } from "react-bootstrap";

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.flushData = this.flushData.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  flushData() {
    axios.get("/api/admins/flushData").then((res) => {
      console.log(res);
      if (res.data.success) {
        alert("Success!");
        this.setState({ show: false });
      }
    });
  }
  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Reload
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation of Flush Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to flush all the data in database? This process cannot
            go back once it start.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.flushData}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class FlushDataCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Card style={{ width: "100%" }}>
          <Card.Title>Flush Data</Card.Title>
          <Card.Text>
            To reload all the data in database from the online dataset
          </Card.Text>
          <ConfirmDialog />
        </Card>
      </div>
    );
  }
}

export default FlushDataCard;
