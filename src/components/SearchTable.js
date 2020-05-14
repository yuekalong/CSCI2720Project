import React from 'react';
import axios from 'axios';
import matchSorter from "match-sorter";
import { Modal, Button } from 'react-bootstrap';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getDistance } from 'geolib';
import {GrStatusInfo} from 'react-icons/gr';


class SearchTable extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:[], //all location details
      home:[], //pair of coordinate
      distance:[],
      markdown:[],
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    axios.get(this.props.port+"/api/admins/readLocation").then((res) => {
      if (res.data.success) {
        this.setState({ data: res.data.data });
      }
    });
    axios.get(this.props.port+"/api/users/getHome").then((res) => {
      if (res.data.success) {
          this.setState({ 
              home: res.data.data.home
          });
      }
      else{
          console.log("get data not success");
      }
    });
  }

  handleClose(){
    this.props.onClick()
  }

  viewLoc(e){
    window.location=this.props.port+"/#/loc/"+e.target.id
  }

  render(){
    var alldata = this.state.data;
    var homedata = this.state.home;
    var tabledata = [];
    for(var i = 0; i < alldata.length; i++){
      let dis = getDistance({latitude: homedata[1], longitude: homedata[0]}, { latitude: alldata[i].latitude, longitude: alldata[i].longitude })/1000;
      tabledata.push({locationName: alldata[i].locationName, address: alldata[i].address, distance: dis, locationID: alldata[i].locationID})
    }
    console.log(tabledata);
    return(
      <Modal.Dialog size="xl">
        <Modal.Header>
          <Modal.Title>Search Locations form Your Home</Modal.Title>
          <p>Home: [{this.state.home[0]}, {this.state.home[1]}]</p>
        </Modal.Header>
        <Modal.Body>
          <ReactTable
              data={tabledata}
              filterable
              columns={[
                {
                  Header: "Name",
                  accessor: "locationName",
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["locationName"] }),
                  filterAll: true
                },
                {
                  Header: "Address",
                  accessor: "address",
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["address"] }),
                  filterAll: true,
                  id: "address"
                },
                {
                  Header: "nearby x km to home location",
                  accessor: "distance",
                  filterable: false,
                },{
                  Header: "Info",
                  accessor: "locationID",
                  sortable: false,
                  filterable: false,
                  Cell: (row) => {
                    return <div>
                      <Button id={row.value} style={{"width": "95%"}} as="input" type="button" variant="info" value="Info" onClick={this.viewLoc}/>
                    </div>
                  }
                }
              ]}
              defaultPageSize={10}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default SearchTable;