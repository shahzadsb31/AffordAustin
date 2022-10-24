import { Row, Container, Card, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GitTotals.css";
import * as Icon from "react-bootstrap-icons";
import React from "react";

function GitTotals(props) {
  return (
    <>
      <Container>
        {/*style={{ width: "100%" }} add this back in to row if things mess up*/}
        <Row className="justify-content-center g-4" xs="auto">
          <Col xs="auto">
            <Card border="light" style={{ borderRadius: "2rem" }}>
              <Card.Body className="git_totals">
                <Card.Title className="text-truncate mt-1 card_names">
                  Total Commits
                </Card.Title>
                <Icon.Check2Circle
                  className="mt-2"
                  style={{ fontSize: "50px", color: "black" }}
                />
                <Card.Subtitle className="m-2 card_names">
                  {props.total_commits}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>

          <Col xs="auto">
            <Card border="light" style={{ borderRadius: "2rem" }}>
              <Card.Body className="git_totals">
                <Card.Title className="mt-1 card_names">
                  Total Issues
                </Card.Title>
                <Icon.ListCheck
                  className="mt-2"
                  style={{ fontSize: "50px", color: "black" }}
                />
                <Card.Subtitle className="m-2 card_names">
                  {props.total_issues}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>

          <Col xs="auto">
            <Card border="light" style={{ borderRadius: "2rem" }}>
              <Card.Body className="git_totals">
                <Card.Title className="text-truncate mt-1 card_names">
                  Total Tests
                </Card.Title>
                <Icon.Wrench
                  className="mt-2"
                  style={{ fontSize: "50px", color: "black" }}
                />
                <Card.Subtitle className="m-2 card_names">89</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GitTotals;
