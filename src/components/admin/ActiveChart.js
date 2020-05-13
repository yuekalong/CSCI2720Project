import React from "react";
import axios from "axios";

import ApexCharts from "apexcharts";

import { Card } from "react-bootstrap";

class ActiveChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Title className="cardTitle">
            Top 5 active users with comments and favourites
          </Card.Title>
        </Card>
      </div>
    );
  }
}

export default ActiveChart;
