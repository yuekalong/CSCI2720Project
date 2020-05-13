import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

import axios from 'axios';

class GoogleMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            Home: {},
            showingInfoWindow: false,
            activeMarker: {},
        };
        axios.get("/api/admins/readLocation").then((res) => {
            if (res.data.success) {
              this.setState({ data: res.data.data });
            }
        });
    }

    onMarkerClick = (locaid) =>{
        window.location="/#/loc/"+locaid
    }

    onMouseoverMarker(props, marker, e){
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    
    onMouseoutMarker(){
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    }

    onMapClicked = (ref, map, e) => {
        const location = e.latLng;
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
        else{
            console.log(location)
        }
      };

    render(){
        const style = {
            width: 'auto',
            height: 'auto',
            margin: '2px',
        }
        const markers = 
        this.state.data.map(location => 
            <Marker
                key={ location.locationID }
                onClick = { this.onMarkerClick(location.locationID) }
                onMouseover={this.onMouseoverMarker.bind(this)}
                onMouseout={this.onMouseoutMarker.bind(this)}
                title = { location.locationName }
                name = { location.locationName }
                position = {{lat: location.latitude, lng: location.longitude}}
            >
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <p>{location.locationName}</p>
                    </div>
                </InfoWindow>
            </Marker>
        );

        return(
            <div>
                {
                    this.props.oneloc ?
                    <Map 
                        google={this.props.google} 
                        zoom={14}
                        initialCenter={{
                            lat: this.props.lat,
                            lng: this.props.lng
                        }}
                        style={style}
                    >
                        <Marker/>
                    </Map>
                    :
                    <Map 
                        google={this.props.google} 
                        onClick={this.onMapClicked}
                        zoom={15}
                        initialCenter={{
                            lat: 22.419618,
                            lng: 114.206759
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