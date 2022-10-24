import "./Home.css";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="mainPage">
      <div className="leftHalf">
        <Container>
          <Row>
            <Col>
              <h1 className="titleLeft">AffordAustin</h1>
              <p className="tagline">Build the life you deserve to live.</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="rightHalf h-100">
        <div className="cardBox flex-grow-1">
          <Link to="/Housing">
            <Card className="housingCard">
              <Card.Title className= "mt-4 mx-auto model_name">Housing</Card.Title>
              <Card.Body>
                <Card.Text className= "model_text">Explore Current and Upcoming Housing Options in Austin</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="cardBox flex-grow-1">
          <Link to="/Childcare">
            <Card className="childcareCard" >
            <Card.Title className= "mt-4 mx-auto model_name">Childcare</Card.Title>
              <Card.Body className="model_text">
                <Card.Text className= "model_text">Explore Local and Professional Childcare
                Options across Austin</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="cardBox flex-grow-1">
          <Link to="/Jobs">
            <Card className="jobsCard">
            <Card.Title className= "mt-4 mx-auto model_name">Jobs</Card.Title>
              <Card.Body className= "model_text">
                <Card.Text>Explore a Wide Range of Jobs Available Across Austin</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
