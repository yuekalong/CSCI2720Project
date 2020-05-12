import React from 'react';
import ObjectList from 'react-object-list';
import Axios from 'axios';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class FavTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
        /* 
        Axios.get("/api/favoriteLists/getFav").then((res) => {
            if (res.data.success) {
              this.setState({ data: res.data.data });
            }
        }); 
        */

       Axios.get("/api/admins/readLocation").then((res) => {
            if (res.data.success) {
            this.setState({ data: res.data.data });
            }
        });

    }
    render() {
        const {data} = this.state;

        const columns = [{
                Header: 'Name',
                accessor: 'locationName', // String-based value accessors!
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["locationName"] }),
                filterAll: true
            }, {
                Header: 'Address',
                accessor: 'address',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["address"] }),
                filterAll: true,
                id: "address"
                //Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }]
        
        return(
            <div>
                <h3>Yout Favorite Location</h3>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                />
            </div>
        )
        
    }
}

export default FavTable;
