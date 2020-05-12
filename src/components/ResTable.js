import React from 'react';
import axios from "axios";
import imageNotFound from "../assets/img/imageNotFound.png";
import { Card, Button, Modal, Table, Form } from "react-bootstrap";
import matchSorter from "match-sorter";
import Rating from '@material-ui/lab/Rating';
import {GrFavorite} from 'react-icons/fa';
// Import React Table
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";


class ResTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    axios.get("/api/admins/readLocation").then((res) => {
      if (res.data.success) {
        this.setState({ data: res.data.data });
      }
    });
    this.viewLoc = this.viewLoc.bind(this);
  }

  viewLoc(e){
    console.log(e.target.id);
    window.location="/#/loc/"+e.target.id
  }

  addFavLoc(e){
    axios.post("/api/favoriteLists/addLocation", e.target.id).then((res) => {
      console.log(res.data)
    }).catch((error)=>{
      console.log(error)
    });
  }

  render() {
    const {data} = this.state;
    return (
      <div>
      <ReactTable
        data={data}
        filterable
        columns={[
          {
            Header: "Photo",
            accessor: "photo",
            sortable: false,
            filterable: false,
            Cell: (row) => {
              if(row.value == "") return <div><img height={50} src={imageNotFound}/></div>
              return <div><img height={34} src={row.value}/></div>
            }
          },
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
            Header: "Rating",
            accessor: "rating",
            id: "rating",
            Cell: (row) => {
              return <Rating
                name="hover-feedback"
                value={row.value}
                precision={0.5}
                readOnly
              />
            }
          },
          {
            Header: "Info",
            accessor: "locationID",
            sortable: false,
            filterable: false,
            Cell: (row) => {
              return <div>
                <Button id={row.value} style={{"width": "70%"}} as="input" type="button" variant="info" value="Info" onClick={this.viewLoc}/>
              </div>
            }
          },
        ]}
        defaultPageSize={10}
      />
      </div>
    );
  }
}

export default ResTable;
