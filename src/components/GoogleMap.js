import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
class GoogleMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
        };
        axios.get("/api/admins/readLocation").then((res) => {
            if (res.data.success) {
              this.setState({ data: res.data.data });
            }
        });
    }

    render(){
        const style = {
            width: 'auto',
            height: 'auto',
            margin: '2px',
        } //not responsive at all.
        const {data} = this.state;

        const markers = 
        this.state.data.map(location => 
            <Marker
                key={ location.locationID }
                onClick = { this.onMarkerClick }
                title = { location.locationName }
                position = {{lat: location.latitude, lng: location.longitude}}
            />
        );
        return(
            <div>
                <Map 
                    google={this.props.google} 
                    zoom={15}
                    initialCenter={{
                    lat: 22.419589,
                    lng: 114.206657
                    }}
                    style={style}
                >
                    {markers}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAg7Rvrm8aUEw01iUi8QNlUVVsVVMJoAYM')
   })(GoogleMap);;