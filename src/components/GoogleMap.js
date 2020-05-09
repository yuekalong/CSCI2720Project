import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class GoogleMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    render(){
        const style = {
            width: '300px',
            height: '300px'
        }
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
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAg7Rvrm8aUEw01iUi8QNlUVVsVVMJoAYM')
   })(GoogleMap);;