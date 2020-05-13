import React from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';

import TopBar from '../components/TopBar.js';
import ResTable from '../components/ResTable.js';
import GoogleMap from '../components/GoogleMap.js';
import FavTable from '../components/FavTable.js';
//
// import IndexHeader from "../components/Headers/IndexHeader.js";

const port = "";

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username: ""
        };
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
    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        <TopBar logined={true} username={this.state.username}/>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col>
                            <ResTable />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <GoogleMap />
                        </Col>
                        <Col>
                            <FavTable />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MainPage;
