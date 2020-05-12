import React from 'react';
import ObjectList from 'react-object-list';
import SearchBar from "./SearchBar.js";
import Axios from 'axios';

class FavTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            favList:[],
        };
        this.componentDidMount = this.componentDidMount.bind (this);
        this.getData = this.getData.bind (this);
        this.displayFavList = this.displayFavList.bind (this);
    }

    componentDidMount = () =>{
        this.getData();
    }

    getData = () =>{
        Axios.get('/api/favoriteLists/getFav')
            .then((response) => {
                const data = response.data;
                this.setState({ favList:data });
                console.log("got data");
            })
            .catch(() => {
                alert("ERROR");
            });
    }

    displayFavList = (list) => {
        if (!list.length) return null;
        return(
            <div>
                <ObjectList
                    columns={[
                            {dataKey: 'name', header: 'Name'},
                            {dataKey: 'location', header: 'Location'},
                    ]}
                    data={list}
                    meta={{
                        totalCount: list.length,
                    }}
                    favouritesEnabled={false}
                />
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.displayFavList(this.state.favList)}
            </div>
        );
    }
}

export default FavTable;
