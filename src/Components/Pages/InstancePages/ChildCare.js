import './Instance.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Image, ListGroup, Nav } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from "react";
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios';
import PageNotFound from './../../PageNotFound';

const ChildCare = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [instanceData, setInstanceData] = useState([]);
    const [isValidId, setIsValidId] = useState(true);
    const [closeJobs, setCloseJobs] = useState([]);
    const [closeHouses, setCloseHouses] = useState([]);

    const getInstanceData = useCallback (async () => {
        setLoading(true);
        let data;
        try {
            data = await axios.get(`https://api.affordaustin.me/api/childcare/${id}`);
            setInstanceData(data.data);
            let links = await axios.get(`https://api.affordaustin.me/api/housing?page[size]=3&page[number]=1&zip_code=${data.data.zip_code}`);
            setCloseHouses(links.data.attributes);
            links = await axios.get(`https://api.affordaustin.me/api/jobs?page[size]=3&page[number]=1&zip_code=${data.data.zip_code}`);
            setCloseJobs(links.data.attributes);
        } catch (error) {
            setIsValidId(false);
        }
        setLoading(false);
    }, [id]);

    useEffect(() => {
        getInstanceData();
    }, [id, getInstanceData]);

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            {!isValidId ? <PageNotFound /> : 
                (loading ? <div></div> : 
                    <ChildCareData child_care={instanceData} housing={closeHouses} jobs={closeJobs}/>)}
            
        </div>
    );
};

const ChildCareData = ({child_care, housing, jobs}) => {
  let days = child_care.days_of_operation.toString();
  days = (days === "Mon,Tue,Wed,Thu,Fri") ? "Monday-Friday" : days.replaceAll(",", ", ");
  let ages = child_care.licensed_to_serve_ages;
  ages = (ages.length > 1) ? ages.toString().replaceAll(",", ", ") : ages;
  let programs = child_care.programs_provided.replaceAll(" ,", ", ").replaceAll(",", ", ");
  let admin_name = (child_care.administrator_director_name === "nan") ? "N/A" : child_care.administrator_director_name;
  const hlink1 = (housing.length < 1) ? "" : ("/Housing/" + housing[0].id);
  const hlink2 = (housing.length < 2) ? "" : ("/Housing/" + housing[1].id);
  const hlink3 = (housing.length < 3) ? "" : ("/Housing/" + housing[2].id);
  const jlink1 = (jobs.length < 1) ? "" : ("/jobs/" + jobs[0].id);
  const jlink2 = (jobs.length < 2) ? "" : ("/jobs/" + jobs[1].id);
  const jlink3 = (jobs.length < 3) ? "" : ("/jobs/" + jobs[2].id);
    return (
      <div>
        <Container className="inst_page">
          <Row className="inst_header"><h1>{child_care.operation_name}</h1></Row>
          <Row style={{paddingLeft:"10px", paddingRight:"10px"}}>
              <Col className="inst_info" md={8}>
                  <Row><Image className="inst_img" src={child_care._image}></Image></Row>
                  <Row className="info_section">
                    <h4>Data</h4>
                    <p><b>Operation Type:</b> {child_care.operation_type}</p>
                    <p><b>Programs Provided:</b> {programs}</p>
                    <p><b>Administrator's Name:</b> {admin_name}</p>
                    <p><b>Accepts Child Care Subsidies:</b> {child_care.accepts_child_care_subsidies}</p>
                    <p><b>Days of Operation:</b> {days}</p>
                    <p><b>Hours of Operations:</b> {child_care.hours_of_operation}</p>
                    <p><b>Licensed to Serve Ages:</b> {ages}</p>
                  </Row>
              </Col>
              <Col className="inst_side_bar">
                  <Row className='side_bar_info'>
                      <h4>Location:</h4>
                      <iframe className="inst_map" src={child_care._map}></iframe>
                  </Row>
                  <Row className='side_bar_info'>
                    <h4>Contact Information</h4>
                    <ListGroup>
                        <ListGroup.Item><b>Phone Number:</b> {child_care.phone_number}</ListGroup.Item>
                        <ListGroup.Item><b>Website:</b> <a href={"https://" + child_care.website_address}>{child_care.website_address}</a></ListGroup.Item>
                        <ListGroup.Item><b>Address:</b> {child_care.location_address}</ListGroup.Item>
                        <ListGroup.Item><b>Mailing Address:</b> {child_care.mailing_address}</ListGroup.Item>
                        <ListGroup.Item><b>County:</b> {child_care.county}</ListGroup.Item>
                        <ListGroup.Item><b>Email Address:</b> {child_care.email_address}</ListGroup.Item>
                    </ListGroup>
                  </Row>
                  <Row className="side_bar_info">
                    <h4>Nearby Housing</h4>
                        <Nav>
                          {(hlink1 === "") ? <p>No close housing</p> :
                            <Nav.Link as={ Link } to={hlink1}>{housing[0].project_name}</Nav.Link>}
                          {(hlink2 === "") ? <></> :
                            <Nav.Link as={ Link } to={hlink2}>{housing[1].project_name}</Nav.Link>}
                          {(hlink3 === "") ? <></> : 
                            <Nav.Link as={ Link } to={hlink3}>{housing[2].project_name}</Nav.Link>}
                        </Nav>
                  </Row>
                  <Row className="side_bar_info">
                      <h4>Nearby Jobs</h4>
                      <Nav>
                          {(jlink1 === "") ? <p>No close jobs</p> :
                            <Nav.Link as={ Link } to={jlink1}>{jobs[0].title}</Nav.Link>}
                          {(jlink2 === "") ? <></> :
                            <Nav.Link as={ Link } to={jlink2}>{jobs[1].title}</Nav.Link>}
                          {(jlink3 === "") ? <></> : 
                            <Nav.Link as={ Link } to={jlink3}>{jobs[2].title}</Nav.Link>}
                      </Nav>
                  </Row>
              </Col>
          </Row>
      </Container>
    </div>
    )

}

export default ChildCare;