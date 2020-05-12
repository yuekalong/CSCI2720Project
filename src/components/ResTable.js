import React from 'react';
import axios from "axios";
import imageNotFound from "../assets/img/imageNotFound.png";
import { Card, Button, Modal, Table, Form } from "react-bootstrap";
import matchSorter from "match-sorter";
import Rating from '@material-ui/lab/Rating';

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
            Header: "Link",
            Cell: (row) => {
              return <div>
                <Button as="input" type="button" value="See more" />
              </div>
            }
          }
        ]}
        defaultPageSize={10}
      />
      </div>
    );
  }
}

export default ResTable;
