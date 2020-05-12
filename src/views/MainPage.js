import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import TopBar from '../components/TopBar.js';
import ResTable from '../components/ResTable.js';
import GoogleMap from '../components/GoogleMap.js';
import FavTable from '../components/FavTable.js';
//
// import IndexHeader from "../components/Headers/IndexHeader.js";

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    render(){
        return(
            <div>
                <TopBar logined={true}/>
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
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MainPage;
