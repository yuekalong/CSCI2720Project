import React from "react";
import axios from "axios";

import { Card, Button, Modal, Form } from "react-bootstrap";

// Import React Table
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

import Rating from "@material-ui/lab/Rating";
import "../../assets/css/AdminPage.css";

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
        <Button
          variant="warning"
          onClick={this.handleShow}
          style={{
            color: "white",
            width: "12em",
            height: "4em",
            float: "left",
          }}
        >
          Create Location <span class="material-icons">add</span>
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
    this.setState({ photo: "e.target.value" });
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
        <Button
          variant="outline-dark"
          size="sm"
          onClick={this.handleShow}
          style={{ float: "right", width: "5em", height: "7em" }}
        >
          <span class="material-icons">create</span>
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
        <Button
          variant="outline-danger"
          size="sm"
          onClick={this.handleShow}
          style={{ float: "right", width: "5em", height: "7em" }}
        >
          <span class="material-icons">delete</span>
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
    this.state = {
      filename: "Choose File",
      notSelected: true,
    };
    this.upload = this.upload.bind(this);
    this.selectedFile = this.selectedFile.bind(this);
  }
  selectedFile(e) {
    this.setState({
      filename: document.getElementById("file").value,
      notSelected: false,
    });
  }
  upload() {
    const formData = new FormData();
    const csvfile = document.getElementById("file");
    formData.append("csvfile", csvfile.files[0]);
    axios.post("/api/admins/readCSV", formData).then((res) => {
      if (res.data.success) {
        alert("success!");
        this.props.refresh(null);
        this.setState({ filename: "Choose File", notSelected: true });
      }
    });
  }
  render() {
    return (
      <div>
        <Form style={{ height: "6em", "padding-right": "2em", float: "right" }}>
          <Form.File
            id="file"
            label={this.state.filename}
            accept="text/csv"
            custom
            onChange={this.selectedFile}
            style={{ width: "15em", float: "right" }}
          />
          <br />
          <br />
          <Button
            disabled={this.state.notSelected}
            onClick={this.upload}
            style={{ width: "15em", height: "4em", float: "right" }}
          >
            Upload CSV
          </Button>
        </Form>
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
        <Card className="adminComponent">
          <Card.Title className="cardTitle">Location</Card.Title>
          <Card.Text
            className="cardText"
            style={{ width: "100%", "text-align": "center" }}
          >
            <CreateLocation refresh={this.refresh} />
            <UploadCSV refresh={this.refresh} />
          </Card.Text>
          <Card.Body className="cardText">
            <ReactTable
              className="adminTable"
              data={this.state.location}
              filterable
              columns={[
                {
                  Header: "Photo",
                  accessor: "photo",
                  sortable: false,
                  filterable: false,
                  Cell: (row) => {
                    if (row.value == "")
                      return (
                        <div>
                          <img height={50} src="" />
                        </div>
                      );
                    return (
                      <div style={{ "text-align": "center" }}>
                        <img height={"100px"} src={row.value} />
                      </div>
                    );
                  },
                },
                {
                  Header: "Name",
                  accessor: "locationName",
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["locationName"] }),
                  filterAll: true,
                },
                {
                  Header: "Address",
                  accessor: "address",
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["address"] }),
                  filterAll: true,
                  id: "address",
                },
                {
                  Header: "Rating",
                  accessor: "rating",
                  id: "rating",
                  Cell: (row) => {
                    return (
                      <Rating
                        name="hover-feedback"
                        value={row.value}
                        precision={0.5}
                        readOnly
                      />
                    );
                  },
                },
                {
                  Header: "",
                  accessor: "",
                  id: "",
                  sortable: false,
                  filterable: false,
                  Cell: (row) => {
                    return (
                      <div>
                        <DeleteLocation
                          onClick={() => {
                            return row.value;
                          }}
                          refresh={this.refresh}
                        />
                        <EditLocation
                          onClick={() => {
                            return row.value;
                          }}
                          refresh={this.refresh}
                        />
                      </div>
                    );
                  },
                },
              ]}
              defaultPageSize={10}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CRUDLocation;
