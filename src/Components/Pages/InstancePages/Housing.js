import './Instance.css';
import { Image, Container, Row, Col, ListGroup, Nav, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState, useCallback } from "react";
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios';
import PageNotFound from './../../PageNotFound';


const Housing = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [instanceData, setInstanceData] = useState([]);
  const [isValidId, setIsValidId] = useState(true);
  const [closeChildCare, setCloseChildCare] = useState([]);
  const [closeJobs, setCloseJobs] = useState([]);

  const getInstanceData = useCallback (async () => {
    setLoading(true);
    let data;
    try {
      data = await axios.get(`https://api.affordaustin.me/api/housing/${id}`);
      setInstanceData(data.data);
      let links = await axios.get(`https://api.affordaustin.me/api/childcare?page[size]=3&page[number]=1&zip_code=${data.data.zip_code}`);
      setCloseChildCare(links.data.attributes);
      links = await axios.get(`https://api.affordaustin.me/api/jobs?page[size]=3&page[number]=1&zip_code=${data.data.zip_code}`);
      setCloseJobs(links.data.attributes);
    } catch (error) {
      setIsValidId(false);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getInstanceData();
  }, [id, getInstanceData])

  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      {!isValidId ? <PageNotFound /> :
        (loading ? <div></div> :
          <HousingData housing={instanceData} child_care={closeChildCare} jobs={closeJobs} />)}
    </div>

  );
}

const HousingData = ({housing, child_care, jobs}) => {
  const clink1 = (child_care.length < 1) ? "" : ("/ChildCare/" + child_care[0].id);
  const clink2 = (child_care.length < 2) ? "" : ("/ChildCare/" + child_care[1].id);
  const clink3 = (child_care.length < 3) ? "" : ("/ChildCare/" + child_care[2].id);
  const jlink1 = (jobs.length < 1) ? "" : ("/jobs/" + jobs[0].id);
  const jlink2 = (jobs.length < 2) ? "" : ("/jobs/" + jobs[1].id);
  const jlink3 = (jobs.length < 3) ? "" : ("/jobs/" + jobs[2].id);
  return (
    <div>
      <Container className="inst_page">
          <Row className="inst_header"><h1>{housing.project_name}</h1></Row>
          <Row style={{paddingLeft:"10px", paddingRight:"10px"}}>
              <Col className="inst_info" md={8}>
                  <Row><Image className="inst_img" src={housing._image}></Image></Row>
                  <Row className="info_section">
                    <h4>Details</h4>
                    <p>Address: {housing.address}</p>
                    <p>ZIP Code: {housing.zip_code}</p>
                    <p>Status: {housing.status}</p>
                    <p>Developer: {housing.developer}</p>
                    <p>Unit Type: {housing.unit_type}</p>
                    <p>Ground Lease: {housing.ground_lease}</p>
                    <p>Tenure: {housing.tenure}</p>
                    <p>Affordability Guarantee: {housing.affordability_expiration_year}</p>
                  </Row>
                  <Row className="info_section" style={{paddingLeft:"15px", paddingRight:"15px"}}>
                    <h4>Price Points</h4>
                    <Table striped bordered style={{textAlign:"center"}}>
                      <thead>
                        <tr><th colSpan={7}>% Family Income</th></tr>
                      </thead>
                        <tbody>
                        <tr>
                          <td>30%</td>
                          <td>40%</td>
                          <td>50%</td>
                          <td>60%</td>
                          <td>65%</td>
                          <td>80%</td>
                          <td>100%</td>
                          </tr>
                        <tr>
                          <td>{housing.units_30_mfi}</td>
                          <td>{housing.units_40_mfi}</td>
                          <td>{housing.units_50_mfi}</td>
                          <td>{housing.units_60_mfi}</td>
                          <td>{housing.units_65_mfi}</td>
                          <td>{housing.units_80_mfi}</td>
                          <td>{housing.units_100_mfi}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
              </Col>
              <Col className="inst_side_bar">
                  <Row className='side_bar_info'>
                      <h4>Location:</h4>
                      <iframe className="inst_map" src={housing._map}></iframe>
                  </Row>
                  <Row className='side_bar_info'>
                    <h4>Contact Information</h4>
                    <ListGroup>
                      <ListGroup.Item>Management Company: {housing.property_management_company}</ListGroup.Item>
                      <ListGroup.Item>Phone Number: {housing.property_manager_phone_number}</ListGroup.Item>
                    </ListGroup>
                  </Row>
                  <Row className="side_bar_info">
                    <h4>Nearby Jobs</h4>
                      <Nav>
                        {(clink1 === "") ? <p>No close child care</p> :
                          <Nav.Link as={ Link } to={clink1}>{child_care[0].operation_name}</Nav.Link>}
                        {(clink2 === "") ? <></> :
                          <Nav.Link as={ Link } to={clink2}>{child_care[1].operation_name}</Nav.Link>}
                        {(clink3 === "") ? <></> : 
                          <Nav.Link as={ Link } to={clink3}>{child_care[2].operation_name}</Nav.Link>}
                      </Nav>
                  </Row>
                  <Row className="side_bar_info">
                      <h4>Nearby Childcare Services</h4>
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
  );
}

export default Housing;
