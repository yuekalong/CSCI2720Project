import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Button, Container, Card, Table } from "react-bootstrap";

import "../assets/css/AboutThisProjectPage.css";

class AboutThisProjectPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ "background-color": "#34638a" }}>
        <Navbar
          className="shadow justify-content-between"
          bg="light"
          expand="lg"
        >
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">FoodRoundCU</Navbar.Brand>
          </Navbar>
          <span className="text-info font-weight-bold">About the Project</span>
          <Link to="/">
            <Button>Back Home</Button>
          </Link>
        </Navbar>

        <Container fluid>
          <br />
          <Card className="AboutThisProjectComponent">
            <Card.Title
              className="cardTitle"
              style={{ "text-align": "center" }}
            >
              About This Project
            </Card.Title>
            <Card.Text className="cardText">
              <div style={{ "font-style": "italic" }}>
                We have read the article{" "}
                <a href="http://www.cuhk.edu.hk/policy/academichonesty">
                  http://www.cuhk.edu.hk/policy/academichonesty
                </a>{" "}
                carefully before working on this project. And we are sure we
                follow the instructions.
              </div>

              <br />
              <br />

              <div>
                <p>In our project, we divide into following several parts:</p>
                <ul>
                  <li>
                    <span className="page">Login Page</span>: done by Jacky Ng
                    ()
                  </li>
                  <li>
                    <span className="page">Main Page</span>: done by Chun ()
                  </li>
                  <li>
                    <span className="page">Location Page</span>: done by Chun ()
                  </li>
                  <li>
                    <span className="page">Admin Page</span>: done by Yue Ka
                    Long (1155110560)
                  </li>
                  <li>
                    <span className="page">About This Project Page</span>: done
                    by Yue Ka Long (1155110560)
                  </li>
                </ul>
              </div>

              <br />
              <hr class="separateLine" />
              <br />

              <div>
                <h2 className="subtitle">How-To...</h2>
                <br />
                <h3 className="subheading">Login Page</h3>
                <br />
                <div className="sectionText">
                  <p>
                    You can input 'Username' and 'Password' to sign up after
                    clicking the Sign Up tab
                  </p>
                  <p>
                    Also, you can input 'Username' and 'Password' at the Login
                    tab to log in our main application in this page
                  </p>
                </div>
                <br />
                <h3 className="subheading">Main Page (after logged in)</h3>
                <br />
                <div className="sectionText">
                  <p>
                    In this page, you can see all the restaurants here shown by
                    a table, and each restaurants will have a info button to let
                    you click it to check the details
                  </p>
                  <p>
                    To scroll down the page a little bit, you can see a map on
                    the left hand side which mark where the restaurants at.
                  </p>
                  <p>
                    And on the left hand side, there has a table which show all
                    the favourite locations
                  </p>
                </div>
                <br />
                <h3 className="subheading">Location Page</h3>
                <div className="sectionText">
                  <p>
                    In Location Page, you can see all the selected restaurant
                    details here
                  </p>
                  <p>
                    You can also favourite the restaurant here, which will add
                    this restaurant into your favourite list
                  </p>
                  <p>
                    Also you can make some comments about the restaurant here.
                  </p>
                </div>
                <br />
                <h3 className="subheading">Admin Page</h3>
                <div className="sectionText">
                  <p>In Admin Page, you can do all the Admin Actions in here</p>
                  <p>
                    Firstly, you can flush the data in the database, which
                    reload all the data
                  </p>
                  <p>
                    Then in the Location Card, you can create location, edit
                    location or even delete the location here. Also you can
                    upload the CSV in the format given on the card. It will
                    automatically help you insert the restaurants inside the CSV
                    into databases.
                  </p>
                </div>
              </div>

              <br />
              <hr class="separateLine" />

              <br />

              <div>
                <h2 className="subtitle">Data Schemas and Models</h2>
                <br />
                <h3 className="subheading">User Schema</h3>
                <div className="sectionText">
                  <Table>
                    <thead>
                      <tr>
                        <td>userID</td>
                        <td>username</td>
                        <td>password</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Number</td>
                        <td>String</td>
                        <td>String</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <br />
                <h3 className="subheading">Location Schema</h3>
                <div className="sectionText">
                  <Table>
                    <thead>
                      <tr>
                        <td>photo</td>
                        <td>locationName</td>
                        <td>address1</td>
                        <td>address2</td>
                        <td>address3</td>
                        <td>latitude</td>
                        <td>longitude</td>
                        <td>phoneNum</td>
                        <td>rating</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>String</td>
                        <td>String</td>
                        <td>String</td>
                        <td>String</td>
                        <td>String</td>
                        <td>Double</td>
                        <td>Double</td>
                        <td>Number (with country code [852])</td>
                        <td>Number (between 1 - 5)</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <br />
                <h3 className="subheading">Comment Schema</h3>
                <div className="sectionText">
                  <Table>
                    <thead>
                      <tr>
                        <td>commentID</td>
                        <td>locationID</td>
                        <td>parent_id</td>
                        <td>posted</td>
                        <td>author</td>
                        <td>text</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>String</td>
                        <td>String</td>
                        <td>String</td>
                        <td>Date</td>
                        <td>ObjectId</td>
                        <td>String</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <br />
                <h3 className="subheading">Comment Schema</h3>
                <div className="sectionText">
                  <Table>
                    <thead>
                      <tr>
                        <td>commentID</td>
                        <td>locationID</td>
                        <td>parent_id</td>
                        <td>posted</td>
                        <td>author</td>
                        <td>text</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>String</td>
                        <td>String</td>
                        <td>String</td>
                        <td>Date</td>
                        <td>ObjectId</td>
                        <td>String</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <br />
                <h3 className="subheading">Favorite List Schema</h3>
                <div className="sectionText">
                  <Table>
                    <thead>
                      <tr>
                        <td>userID</td>
                        <td>favorite</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Number</td>
                        <td>ObjectId</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <br />
              <hr class="separateLine" />

              <br />

              <div>
                <h2 className="subtitle">
                  Technologies and frameworks/libraries in use
                </h2>
                <br />
                <p>
                  In this project, we mainly make use of React.js and Express.js
                  to build our applcation. And we choose mongoDB as our
                  database.
                </p>
                <h3 className="subheading">Advantage of using React.js</h3>
                <ul>
                  <li>
                    React.js is very popular in this field and many confusing
                    points are solved online which can be easily found on Google
                  </li>
                  <li>
                    There are many plugins and supports on this framework. Other
                    platforms like Vue.js or Angular.js are not that flexible
                    and the support are not as many as React.js.
                  </li>
                </ul>
                <br />
                <h3 className="subheading">Disadvantage of using React.js</h3>
                <ul>
                  <li>
                    We are required to understand React.js well before we start
                    to work. It is quite time consuming and not that friendly.
                  </li>
                  <li>
                    The use of JSX actually quite confuse sometime. For example
                    class tag in html become className. It required some
                    different syntax for JSX which cannot directly plug in what
                    we learn for HTML.
                  </li>
                </ul>
                <br />
                <h3 className="subheading">Advantage of using mongoDB</h3>
                <ul>
                  <li>
                    It is designed for storing internet data like JSON objects
                  </li>
                  <li>
                    As mongoDB is an NoSQL database, it brings us a more
                    flexible environment on storing our data as our project is a
                    web-based project which the type of data will change
                    dynamically.
                  </li>
                </ul>
                <br />
                <h3 className="subheading">Disadvantage of using mongoDB</h3>
                <ul>
                  <li>
                    As it is NoSQL database. The object we insert or we query
                    may not follow the type we build on the schema...
                  </li>
                  <li>
                    It is quite hard to use as the syntax is quite hard to
                    understand and it is hard to find online support compare
                    with SQL database like mySQL. Their syntax are more easily
                    to understand and more support.
                  </li>
                </ul>
              </div>
              <br />
              <br />
            </Card.Text>
          </Card>
          <br />
        </Container>
      </div>
    );
  }
}

export default AboutThisProjectPage;
