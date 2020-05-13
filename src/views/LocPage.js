import React from "react";
import axios from "axios";
import TopBar from '../components/TopBar.js';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import Rating from '@material-ui/lab/Rating';
import imageNotFound from "../assets/img/imageNotFound.png";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMap from "../components/GoogleMap";

const port = "";
class LocPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username: "",
          data: {},
          map: true
        };
    }

    componentDidMount() {
        var url = window.location.href;
        var locID = url.substring((url.indexOf("loc")+4));
        axios({
            method: 'post',
            url: port+'/api/users/checkLogin',
        })
        .then((res) => {
            if(res.data.status == "not logined"){
            window.location = "/#/";
            }
            else if (res.data.status == "logined"){
                this.setState({
                    username: res.data.username
                });
            }
        });

        axios({
            method: 'post',
            url: port+'/api/locations/loc/'+locID,
            data: {locID: locID}
        })
        .then((res) => {
            if(res.data.success){
                console.log(res.data.data);
                if (res.data.data == null){
                    this.setState({
                        data: {
                            locationName: "404 Not Found",
                            photo: {imageNotFound},
                            address: "",
                            phoneNum: "",
                            rating: "",
                            latitude: "",
                            longitude: ""
                          },
                        map: false
                    }); 
                }
                else {
                    this.setState({
                        data: res.data.data
                    });  
                }
            }
            else {
                alert("ERROR");
                window.location = "/#/";
            }
        });
    }
      render() {
          let loc = this.state.data;
          console.log(loc.latitude)
          return(
              <div>
                <Row>
                    <Col>
                        <TopBar logined={true} username={this.state.username}/>
                    </Col>
                </Row>
                <Container>
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" style={{ width: '100%', height: '300px', "object-fit": "cover"}} src={loc.photo} />
                        <Card.Body>
                            <Card.Title>{loc.locationName}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Rating name="rating"
                                    value={parseInt(loc.rating)}
                                    precision={0.5}
                                    readOnly
                                />
                            </ListGroupItem>
                            <ListGroupItem>Phone Number: {loc.phoneNum}</ListGroupItem>
                        </ListGroup>
                        <Card.Body style={{ height: '400px' }}>
                            {loc.address}
                            {this.props.map &&<GoogleMap oneloc={true} lat={loc.latitude} lng={loc.longitude}/>}
                        </Card.Body>
                    </Card>
                </Container>
              </div>
          )
      }
}

export default LocPage;
