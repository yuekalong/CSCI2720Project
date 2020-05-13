import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import TopBar from '../components/TopBar.js';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import Rating from '@material-ui/lab/Rating';
import imageNotFound from "../assets/img/imageNotFound.png";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMap from "../components/GoogleMap";
import CommentsContainer from "../components/CommentsContainer";

const port = "";
class LocPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            locID: window.location.href.substring((window.location.href.indexOf("loc")+4)),
            username: "",
            data: {},
            notFav: true,
        };
        this.addtofavorite = this.addtofavorite.bind(this);
        this.delFav = this.delFav.bind(this);
    }

    componentDidMount() {
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
            url: port+'/api/locations/loc/'+this.state.locID,
            data: {locID: this.state.locID}
        })
        .then((res) => {
            if(res.data.success){
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
                          }
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

    addtofavorite=(loc)=>{
        console.log('addTofav')
        console.log(loc)
    }
    
    delFav=(e)=>{
        console.log('delfav');
    }
    
    render() {
        let loc = this.state.data;
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
                    { this.props.notFav ?
                        <Button id={loc.locationID} as="input" type="button" variant="danger" value="Delete favorite" onClick={() => this.delFav}/>
                        :
                        <Button id={loc.locationID} as="input" type="button" variant="success" value="Add favorite" onClick={() => this.addtofavorite(loc)}/>
                    }
                    <Card.Body style={{ height: '400px' }}>
                        {loc.address}
                        <GoogleMap showOne={true} oneLat={loc.latitude} oneLog={loc.longitude}/>
                    </Card.Body>
                </Card>
                <CommentsContainer locID={this.state.locID}/>
            </Container>
            </div>
        )
    }
}

export default LocPage;
