import React from "react";
import axios from "axios";
import TopBar from '../components/TopBar.js';
import { Container, Row, Col } from 'reactstrap';

const port = "";
class LocPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username: "",
          data: {}
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
                this.setState({
                    data: res.data.data
                });
            }
            else {
                alert("ERROR");
            }
        });
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
                    <div>{loc.locationName}</div>
                    <hr/>
                    <img style={{"height": "50%"}} src={loc.photo}/>
                    <hr/>
                    <div>{loc.address}</div>
                    <div>{loc.rating}</div>
                    <div>{loc.phoneNum}</div>
                    <div>{loc.latitude}</div>
                    <div>{loc.longitude}</div>
                </Container>
              </div>
          )
      }
}

export default LocPage;
