import React from "react";
import axios from "axios";

import "../../assets/css/AdminPage.css";

import ReactApexChart from "react-apexcharts";

import { Card } from "react-bootstrap";

class ActiveChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentOptions: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      commentSeries: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      favouriteOptions: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      favouriteSeries: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };

    axios.get(this.props.port+`/api/admins/activeUserWithComments`).then((res) => {
      if (res.data.success) {
        this.setState({
          commentOptions: {
            chart: {
              id: "username",
            },
            xaxis: {
              categories: res.data.data.map((data) => data._id[0].username),
            },
          },
          commentSeries: [
            {
              name: "count",
              data: res.data.data.map((data) => data.count),
            },
          ],
        });
      }
    });
    axios.get(this.props.port + `/api/admins/activeUserWithFavourites`).then((res) => {
      if (res.data.success) {
        this.setState({
          favouriteOptions: {
            chart: {
              id: "username",
            },
            xaxis: {
              categories: res.data.data.map((data) => data.username),
            },
          },
          favouriteSeries: [
            {
              name: "count",
              data: res.data.data.map((data) => data.count),
            },
          ],
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Card className="adminComponent">
          <Card.Title className="cardTitle">
            Top 5 active users with comments
          </Card.Title>
          <Card.Text className="cardText">
            <ReactApexChart
              options={this.state.commentOptions}
              series={this.state.commentSeries}
              type="bar"
              height={350}
            />
          </Card.Text>
          <Card.Title className="cardTitle">
            Top 5 active users with favourites
          </Card.Title>
          <Card.Text className="cardText">
            <ReactApexChart
              options={this.state.favouriteOptions}
              series={this.state.favouriteSeries}
              type="bar"
              height={350}
            />
          </Card.Text>
        </Card>
      </div>
    );
  }
}

export default ActiveChart;
