import React from 'react';

import TopBar from 'components/TopBar.js';
import ResTable from 'components/ResTable.js';
import GoogleMap from 'components/GoogleMap.js';
import FavTable from 'components/FavTable.js';

import IndexHeader from "components/Headers/IndexHeader.js";

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    render(){
        return(
            <>
                <IndexHeader />
                <div>
                    <TopBar>
                    </TopBar> 
                    <ResTable>
                    </ResTable>
                    <GoogleMap>
                    </GoogleMap>
                    <FavTable>
                    </FavTable>
                </div>
            </>
        )
    }
}

export default MainPage;