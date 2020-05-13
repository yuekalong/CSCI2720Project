import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import axios from 'axios';

class GoogleMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            home:[],
            showOne:false,
        };
        axios.get("/api/admins/readLocation").then((res) => {
            if (res.data.success) {
              this.setState({ data: res.data.data });
            }
        });
        this.onMarkerClick = this.onMarkerClick.bind(this);

        this.mapClicked = this.mapClicked.bind(this);
    }

    onMarkerClick = (props, marker, e) =>{
        window.location="/#/loc/"+props.locid
    }

    mapClicked = (mapProps, map, clickEvent) => {
        let location = clickEvent.latLng;
        let lng = location.lng();
        let lat = location.lat();
        axios
        .put("/api/users/addHome", {
            homeCoord: [lng , lat],
        })
        .then((res) => {
            this.setState({
                home:res.data.home
            });
        });
    };

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
                {this.props.showOne ?
                    <Map 
                        google={this.props.google} 
                        zoom={15}
                        initialCenter={{
                        lat: this.props.oneLat,
                        lng: this.props.oneLog
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
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAg7Rvrm8aUEw01iUi8QNlUVVsVVMJoAYM')
   })(GoogleMap);;