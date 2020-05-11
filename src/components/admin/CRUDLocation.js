import React from "react";
import axios from "axios";

import { Card, Button, Modal, Table, Form } from "react-bootstrap";

class CreateLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      photo: null,
      locationName: null,
      address1: null,
      address2: null,
      address3: null,
      latitude: null,
      longitude: null,
      phoneNum: null,
      rating: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.photoChange = this.photoChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.address1Change = this.address1Change.bind(this);
    this.address2Change = this.address2Change.bind(this);
    this.address3Change = this.address3Change.bind(this);
    this.latitudeChange = this.latitudeChange.bind(this);
    this.longitudeChange = this.longitudeChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.ratingChange = this.ratingChange.bind(this);
    this.createLocation = this.createLocation.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({
      show: true,
    });
  }

  photoChange(e) {
    this.setState({ photo: e.target.value });
    console.log(this.state);
  }
  nameChange(e) {
    this.setState({ locationName: e.target.value });
  }
  address1Change(e) {
    this.setState({ address1: e.target.value });
  }
  address2Change(e) {
    this.setState({ address2: e.target.value });
  }
  address3Change(e) {
    this.setState({ address3: e.target.value });
  }
  latitudeChange(e) {
    this.setState({ latitude: e.target.value });
  }
  longitudeChange(e) {
    this.setState({ longitude: e.target.value });
  }
  phoneChange(e) {
    this.setState({ phoneNum: e.target.value });
  }
  ratingChange(e) {
    this.setState({ rating: e.target.value });
  }
  createLocation() {
    const newObj = {
      photo: this.state.photo,
      locationName: this.state.locationName,
      address: [this.state.address1, this.state.address2, this.state.address3],
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      phoneNum: this.state.phoneNum,
      rating: this.state.rating,
    };
    axios
      .post("/api/admins/createLocation", {
        obj: JSON.stringify(newObj),
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Success!");
          this.setState({
            show: false,
            photo: null,
            locationName: null,
            address1: null,
            address2: null,
            address3: null,
            latitude: null,
            longitude: null,
            phoneNum: null,
            rating: null,
          });
          this.props.refresh(null);
        }
      });
  }
  render() {
    return (
      <div>
        <Button variant="warning" onClick={this.handleShow}>
          Create Location +
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.photo}
                  onChange={this.photoChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.locationName}
                  onChange={this.nameChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.address1}
                  onChange={this.address1Change}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.address2}
                  onChange={this.address2Change}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address 3</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.address3}
                  onChange={this.address3Change}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.latitude}
                  onChange={this.latitudeChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.longitude}
                  onChange={this.longitudeChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.phoneNum}
                  onChange={this.phoneChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.rating}
                  onChange={this.ratingChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.createLocation}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class EditLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      locationID: null,
      photo: null,
      locationName: null,
      address1: null,
      address2: null,
      address3: null,
      latitude: null,
      longitude: null,
      phoneNum: null,
      rating: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.photoChange = this.photoChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.address1Change = this.address1Change.bind(this);
    this.address2Change = this.address2Change.bind(this);
    this.address3Change = this.address3Change.bind(this);
    this.latitudeChange = this.latitudeChange.bind(this);
    this.longitudeChange = this.longitudeChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.ratingChange = this.ratingChange.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    const location = this.props.onClick(null);
    this.setState({
      locationID: location.locationID,
      photo: location.photo,
      locationName: location.locationName,
      address1: location.address[0],
      address2: location.address[1],
      address3: location.address[2],
      latitude: location.latitude,
      longitude: location.longitude,
      phoneNum: location.phoneNum,
      rating: location.rating,
      show: true,
    });
  }

  photoChange(e) {
    console.log(e.target.value);
    this.setState({ photo: "e.target.value" });
    console.log(this.state);
  }
  nameChange(e) {
    this.setState({ locationName: e.target.value });
  }
  address1Change(e) {
    this.setState({ address1: e.target.value });
  }
  address2Change(e) {
    this.setState({ address2: e.target.value });
  }
  address3Change(e) {
    this.setState({ address3: e.target.value });
  }
  latitudeChange(e) {
    this.setState({ latitude: e.target.value });
  }
  longitudeChange(e) {
    this.setState({ longitude: e.target.value });
  }
  phoneChange(e) {
    this.setState({ phoneNum: e.target.value });
  }
  ratingChange(e) {
    this.setState({ rating: e.target.value });
  }
  updateLocation() {
    const updateObj = {
      locationID: this.state.locationID,
      photo: this.state.photo,
      locationName: this.state.locationName,
      address: [this.state.address1, this.state.address2, this.state.address3],
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      phoneNum: this.state.phoneNum,
      rating: this.state.rating,
    };
    axios
      .put("/api/admins/updateLocation", {
        obj: JSON.stringify(updateObj),
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Success!");
          this.setState({
            show: false,
            locationID: null,
            photo: null,
            locationName: null,
            address1: null,
            address2: null,
            address3: null,
            latitude: null,
            longitude: null,
            phoneNum: null,
            rating: null,
          });
          this.props.refresh(null);
        }
      });
  }
  render() {
    return (
      <div>
        <Button variant="outline-dark" size="sm" onClick={this.handleShow}>
          edit
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.photo}
                  onChange={this.photoChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.locationName}
                  onChange={this.nameChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.address1}
                  onChange={this.address1Change}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.address2}
                  onChange={this.address2Change}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address 3</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.address3}
                  onChange={this.address3Change}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.latitude}
                  onChange={this.latitudeChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.longitude}
                  onChange={this.longitudeChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.phoneNum}
                  onChange={this.phoneChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.rating}
                  onChange={this.ratingChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.updateLocation}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class DeleteLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      location: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ location: this.props.onClick(null), show: true });
  }
  deleteLocation() {
    axios
      .delete(`/api/admins/deleteLocation/${this.state.location.locationID}`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Success!");
          this.setState({ show: false });
          this.setState({ location: undefined });
          this.props.refresh(null);
        }
      });
  }
  render() {
    return (
      <div>
        <Button variant="outline-danger" size="sm" onClick={this.handleShow}>
          delete
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation of Delete Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to delete this location? This process cannot go back
            once it start.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.deleteLocation}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class UploadCSV extends React.Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
  }
  upload() {
    const formData = new FormData();
    const csvfile = document.getElementById("file");
    formData.append("csvfile", csvfile.files[0]);
    axios.post("/api/admins/readCSV", formData);
  }
  render() {
    return (
      <div>
        <Form.File.Input id="file" accept="text/csv" />
        <Button onClick={this.upload}>Upload CSV</Button>
      </div>
    );
  }
}

class CRUDLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
    };

    axios.get("/api/admins/readLocation").then((res) => {
      if (res.data.success) {
        this.setState({ location: res.data.data });
      }
    });
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    axios.get("/api/admins/readLocation").then((res) => {
      if (res.data.success) {
        this.setState({ location: res.data.data });
      }
    });
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Title>Location</Card.Title>
          <Card.Text>
            <CreateLocation refresh={this.refresh} />
            <UploadCSV refresh={this.refresh} />
          </Card.Text>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Phone Number</th>
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.location.map((loc, i) => (
                  <tr key={i}>
                    <img src={loc.photo} width="75px" height="75px"></img>
                    <td>{loc.locationName}</td>
                    <td>
                      {loc.address[0] +
                        (loc.address[1] == null ? "" : loc.address[1]) +
                        (loc.address[2] == null ? "" : loc.address[2])}
                    </td>
                    <td>{loc.latitude}</td>
                    <td>{loc.longitude}</td>
                    <td>{loc.phoneNum}</td>
                    <td>{loc.rating}</td>
                    <td>
                      <EditLocation
                        onClick={() => {
                          return loc;
                        }}
                        refresh={this.refresh}
                      />
                      <br />
                      <DeleteLocation
                        onClick={() => {
                          return loc;
                        }}
                        refresh={this.refresh}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CRUDLocation;
