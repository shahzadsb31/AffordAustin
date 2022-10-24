import React from "react";
import { Row, Container, Button, Card, Col, ListGroup, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberCards from "./MemberCards/MemberCards";
import GitTotals from "./GitTotals/GitTotals";
import "./About.css";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import teamInfo from "./TeamData";
import AWSAmplifyLogo from "./ToolLogos/AWSAmplifyLogo.png"
import AWSLogo from "./ToolLogos/AWSLogo.png"
import BlackLogo from "./ToolLogos/BlackLogo.png"
import DockerLogo from "./ToolLogos/DockerLogo.png"
import FlaskLogo from "./ToolLogos/FlaskLogo.jpg"
import JestLogo from "./ToolLogos/JestLogo.png"
import MarshmallowLogo from "./ToolLogos/MarshmallowLogo.png"
import PostgresLogo from "./ToolLogos/PostgresLogo.png"
import SeleniumLogo from "./ToolLogos/SeleniumLogo.png"
import SQLAlchemyLogo from "./ToolLogos/SQLAlchemyLogo.png"
import GitlabLogo from "./ToolLogos/GitlabLogo.png"
import NameCheapLogo from "./ToolLogos/NameCheapLogo.jpg"
import PostmanLogo from "./ToolLogos/PostmanLogo.png"
import ReactLogo from "./ToolLogos/ReactLogo.png"

const tools = ["React", "Amplify", "GitLab", "NameCheap", "Postman", "AWS", "Black",
               "Docker", "Flask", "Jest", "Marshmallow", "Postgres", "Selenium", 
               "SQLAlchemy",];
const tool_link = ["https://reactjs.org/", "https://aws.amazon.com/amplify/", "https://about.gitlab.com/", "https://www.namecheap.com/", "https://www.postman.com/", 
    "https://aws.amazon.com/about-aws/", "https://github.com/psf/black", "https://docs.docker.com/get-started/overview/",
    "https://flask.palletsprojects.com/en/2.1.x/#", "https://jestjs.io/", "https://github.com/marshmallow-code/marshmallow",
    "https://www.postgresql.org/about/", "https://www.selenium.dev/about/", "https://www.sqlalchemy.org/"];
const tool_logo = [ReactLogo, AWSAmplifyLogo, GitlabLogo, NameCheapLogo, PostmanLogo, AWSLogo,
                   BlackLogo, DockerLogo, FlaskLogo, JestLogo, MarshmallowLogo, PostgresLogo,
                   SeleniumLogo, SQLAlchemyLogo];

const tools_desc = [
  "Used to develop the frontend using UI components.",
  "Managed Amazon Web Services backend used for deploying frontend code.",
  "Contains production site code. Used for seamless and collaborative integration.",
  "Used to acquire a domain name for a useable URL and SSL authentication.",
  "Helped design the backend RESTful API design and documentation.",
  "Used for database and backend API server management.",
  "Used for formatting python code.",
  "Containerization tool used to manage environment images.",
  "Web app framework used for API development.",
  "Used for testing Javascript code.",
  "Used for managing database schemas.",
  "Management system for the relational database.",
  "Used for testing scripts in browser.",
  "Python SQL toolkit and Object relation manager."
];

const apis = [
  [
    "SerpAPI Jobs API",
    "Used to find job postings.",
    "https://serpapi.com/google-jobs-api",
  ],
  [
    "data.texas.gov API",
    "Contains two disparate data sources used for finding metadata related to housing and childcare in Austin.",
    "https://data.texas.gov/",
  ],
  [
    "Google Maps",
    "Provides an iframe to embed Google Maps data.",
    "https://www.google.com/maps",
  ],
  [
    "Google Images",
    "Used to retrieve related image data for model instances.",
    "https://www.google.com/imghp?hl=EN",
  ],
];

let total_issues = 0;
let total_commits = 0;

const contributor_to_team_num = {
  sca: 0,
  din: 1,
  jay: 2,
  pre: 3,
  phe: 3,
  sab: 4,
  sha: 4,
};

function About() {
  const [total_commits, setCommits] = useState(0);
  const [total_issues, setIssues] = useState(0);
  useEffect(() => {
    async function getGitlabStats() {
      await axios
        .get(
          "https://gitlab.com/api/v4/projects/33875511/repository/contributors"
        )
        .then((resp) => {
          let c = 0;
          resp.data.forEach((contributor) => {
            const { name, email, commits } = contributor;
            let team_num =
              contributor_to_team_num[name.substring(0, 3).toLowerCase()];
            teamInfo[team_num]["commits"] = commits;
            c += commits;
          });
          setCommits(c);
        });
      let i = 0;
      Promise.all(
        teamInfo.map(async (member) => {
          let issues_api =
            "https://gitlab.com/api/v4/projects/33875511/issues_statistics?author_username=" +
            member.user;
          await axios.get(issues_api).then((resp) => {
            member["issues"] = resp["data"]["statistics"]["counts"]["closed"];
            i += resp["data"]["statistics"]["counts"]["closed"];
          });
        })
      ).then(() => {
        setIssues(i);
      });
    }
    getGitlabStats();
  }, []);
  return (
    <div
      className="App"
      style={{ backgroundColor: "#f0f2f5", paddingBottom: "3em" }}
    >
      {/* About us block */}
      <h1 className="section_header">About Us</h1>
      <Container>
        <Card
          border="light"
          className="about_text mx-auto"
          style={{ borderRadius: "2rem" }}
        >
          <Card.Body className="" style={{ color: "black" }}>
            The cost of living in Austin has reportedly risen 17.8% since 2010.
            In the past year alone, the listing prices for houses spiked 28%. At
            AffordAustin, we strive to provide plausible living situations in
            Austin amidst harsh inflation by streamlining the process of finding
            economic housing, child care, and work. Users will be able to search
            by any of the aforementioned categories based on their priority,
            then find nearby instances of the other two categories.
          </Card.Body>
        </Card>
      </Container>

      {/* Member Cards */}
      <MemberCards teamInfo={teamInfo} />

      {/*Git Total Stats*/}
      <h1 className="section_header">Git Statistics</h1>
      <GitTotals total_commits={total_commits} total_issues={total_issues} />

      {/*Tool Info*/}
      <h1 className="section_header">Tools Used</h1>
      <Card
       
        className="instance_data mx-auto border-0"
        style={{
          borderRadius: "2rem",
          borderTopLeftRadius: "2rem",
          backgroundColor: "#f0f2f5"
        }}
      >

          <Row xs='auto'className="justify-content-center">
            
            {tools.map((tool, index) => (
              <Card border="light" className="tool_about_list m-4">
                <a className="tool_desc" href={tool_link[index]}>
                <Card.Img variant="top" src={tool_logo[index]} className="tool_logo mt-1" />
                <Card.Body>
                  <Card.Title className="mt-auto" ></Card.Title>
                    <b>{tool}</b>
                  <Card.Text style={{fontSize:"95%"}}>{tools_desc[index]}</Card.Text>
                </Card.Body>
                </a>

              </Card>



                /* <Col className="tool_about_list mx-auto">
                <Row href={tool_link[index]} className="justify-content-center"><Image src={tool_logo[index]} className="tool_logo"></Image></Row>
                <a href={tool_link[index]}><b>{tool}</b></a>
                <br></br>
                {tools_desc[index]}
                <br></br>
                
                </Col> */
            ))}
          </Row>
      </Card>

      
      

      {/*API Info*/}
      <h1 className="section_header">Data Source Links</h1>
      <Card
        border="light"
        className="instance_data mx-auto"
        style={{
          backgroundColor: "#f0f2f5",
          borderRadius: "2rem",
          borderTopLeftRadius: "2rem",
        }}
      >
        <ListGroup
          variant="flush"
          style={{
            borderRadius: "2rem",
          }}
        >
          {apis.map((api) => (
            <a href={api[2]} target="_blank">
              <ListGroup.Item className="link about_list" key={api[0]}>
                <b>{api[0]}</b>
                <br></br>
                {api[1]}
              </ListGroup.Item>
            </a>
          ))}
        </ListGroup>
      </Card>

      <h1 className="section_header">Our Links</h1>
      <Card
        className="instance_data mx-auto border-0"
        style={{
          borderRadius: "2rem",
          borderTopLeftRadius: "2rem",
          backgroundColor: "#f0f2f5"
        }}
      >

          <Row xs='auto'className="justify-content-center">
            
              <Card border="light" className="tool_about_list m-4">
                <a className="tool_desc" href="https://gitlab.com/dinesh.k.balakrishnan/cs373-website">
                <Card.Img src={tool_logo[2]} />
                <Card.Body>
                  <Card.Title className="" ></Card.Title>
                    <b>Gitlab</b>
                  <Card.Text style={{fontSize:"95%"}}> Our Repository</Card.Text>
                </Card.Body>
                </a>
              </Card>

              <Card border="light" className="tool_about_list m-4">
                <a className="tool_desc" href="https://documenter.getpostman.com/view/19702236/UVksLu2r">
                <Card.Img className = "mt-4" style ={{width:"75%", height:"54%"}} src={tool_logo[4]} />
                <Card.Body>
                  <Card.Title className="mt-3" ></Card.Title>
                    <b>Postman</b>
                  <Card.Text style={{fontSize:"95%"}}> Our API Documentation</Card.Text>
                </Card.Body>
                </a>

              </Card>
          </Row>
      </Card>

      <h1 className="section_header">Interesting Results</h1>
      <ul>
        <li>
          <h2 className="temp_interesting">
            The most affordable housing instances are located in Travis County.
          </h2>
        </li>
        <li>
          <h2 className="temp_interesting">
            The most daycare instances are located in Harris County.
          </h2>
        </li>
      </ul>
    </div>
  );
}

export default About;
