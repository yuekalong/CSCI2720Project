import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import axios from 'axios';
import Button from 'react-bootstrap'

class GoogleMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            home:[],
            showOne:false,
            WantAddOrUpdateHome: false,
        };
        axios.get("/api/admins/readLocation").then((res) => {
            if (res.data.success) {
              this.setState({ data: res.data.data });
            }
        });
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.mapClicked = this.mapClicked.bind(this);
        this.addingupdatingHome = this.addingupdatingHome.bind(this);
    }

    componentDidMount(){
        axios.get("/api/users/getHome").then((res) => {
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

    onMarkerClick = (props, marker, e) =>{
        window.location="/#/loc/"+props.locid
    }

    mapClicked = (mapProps, map, clickEvent) => {
        if(this.state.WantAddOrUpdateHome){
            let location = clickEvent.latLng;
            let lng = location.lng();
            let lat = location.lat();
            let coord = [lng, lat];
            axios
                .put("/api/users/updateHome", {
                    home: coord,
                })
                .then((res) => {
                    if (res.data.success) {
                        this.setState({
                            home: res.data.homeCoord,
                            WantAddOrUpdateHome: false
                        });
                    }
            });
            console.log(coord)
        }else{
            alert("Please click Add/Update Home.")
        }
    };

    addingupdatingHome=()=>{
        this.setState({
            WantAddOrUpdateHome: true
        });
    }

    render(){
        const style = {
            width: 'auto',
            height: 'auto',
            margin: '2px',
        }
        const {data} = this.state;

        const markers = 
        this.state.data.map((location,index) => 
                <Marker
                    onClick = { this.onMarkerClick }
                    onMouseover={ this.onMouseoverMarker }
                    onMouseout={ this.onMouseoutMarker }
                    key={ index }
                    locid={ location.locationID }
                    title = { location.locationName }
                    position = {{lat: location.latitude, lng: location.longitude}}
                >
                </Marker>
        );

        return(
            <div>
                    {this.props.oneLat}, {this.props.oneLog}<br/>
                    <button onClick={this.addingupdatingHome}>Add/Update Home</button>
                    <br/>Your Home location: {this.state.home}
                <div>
                    {this.props.showOne ?
                        <Map 
                            google={this.props.google} 
                            zoom={15}
                            initialCenter={{
                            lat: parseFloat(this.props.oneLat),
                            lng: parseFloat(this.props.oneLog)
                            }}
                            style={style}
                        >
                            <Marker/>
                        </Map>
                        :
                        <Map 
                            google={this.props.google} 
                            onClick={this.mapClicked}
                            zoom={15}
                            initialCenter={{
                            lat: 22.419589,
                            lng: 114.206657
                            }}
                            style={style}
                        >
                            {markers}
                        </Map>
                    }
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAg7Rvrm8aUEw01iUi8QNlUVVsVVMJoAYM')
   })(GoogleMap);;