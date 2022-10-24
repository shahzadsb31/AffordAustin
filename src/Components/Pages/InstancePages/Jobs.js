import './Instance.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Image, ListGroup, Button, Nav } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from "react";
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios';
import PageNotFound from './../../PageNotFound';

const Jobs = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [instanceData, setInstanceData] = useState([]);
    const [isValidId, setIsValidId] = useState(true);
    const [closeChildCare, setCloseChildCare] = useState([]);
    const [closeHouses, setCloseHouses] = useState([]);

    const getInstanceData = useCallback (async () => {
        setLoading(true);
        let data;
        try {
            data = await axios.get(`https://api.affordaustin.me/api/jobs/${id}`);
            setInstanceData(data.data);
            let links = await axios.get(`https://api.affordaustin.me/api/childcare?page[size]=3&page[number]=1&zip_code=${data.data.zip_code}`);
            setCloseChildCare(links.data.attributes);
            links = await axios.get(`https://api.affordaustin.me/api/housing?page[size]=3&page[number]=1&zip_code=${data.data.zip_code}`);
            setCloseHouses(links.data.attributes);
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
                    <JobData job={instanceData} child_care={closeChildCare} housing={closeHouses}/>)}
        </div>
    );
};

const JobData = ({job, child_care, housing}) => {
    const clink1 = (child_care.length < 1) ? "" : ("/ChildCare/" + child_care[0].id);
    const clink2 = (child_care.length < 2) ? "" : ("/ChildCare/" + child_care[1].id);
    const clink3 = (child_care.length < 3) ? "" : ("/ChildCare/" + child_care[2].id);
    const hlink1 = (housing.length < 1) ? "" : ("/Housing/" + housing[0].id);
    const hlink2 = (housing.length < 2) ? "" : ("/Housing/" + housing[1].id);
    const hlink3 = (housing.length < 3) ? "" : ("/Housing/" + housing[2].id);
    return (
        <div>
            <Container className="inst_page">
                <Row className="inst_header"><h1>{job.title}</h1></Row>
                <Row style={{paddingLeft:"10px", paddingRight:"10px"}}>
                    <Col className="inst_info" md={8}>
                        <Row><Image className="inst_img" src={job._image}></Image></Row>
                        <Row className="info_section">
                            <h3>Description</h3>
                            <p>{ job.description }</p>
                        </Row>
                    </Col>
                    <Col className="inst_side_bar">
                        <Row className='side_bar_info'>
                            <h4>Location:</h4>
                            <iframe src={job._map}></iframe>
                        </Row>
                        <Row className='side_bar_info'>
                            <h4>Company</h4>
                            <p>{ job.company_name }</p>
                        </Row>
                        <Row className="side_bar_info">
                            <h4>Via</h4>
                            <Button variant='primary' href={ job.apply_link }>{ job.via }</Button>
                        </Row>
                        <Row className="side_bar_info">
                            <h4>Features</h4>
                            <ListGroup>
                                {job.extensions.map(feature => (
                                    <ListGroup.Item key={feature}>{feature}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Row>
                        <Row className="side_bar_info">
                            <h4>Rating</h4>
                            {job.rating === -1 ? <div><p>No Reviews</p></div> : 
                            <p><b>{ job.rating }</b> / 5 | <a href={job.rating_link} style={{color:"blue"}}>{ job.reviews } Reviews</a></p>}
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
                            <h4>Nearby Childcare Services</h4>
                            <Nav>
                            {(clink1 === "") ? <p>No close child care</p> :
                                <Nav.Link as={ Link } to={clink1}>{child_care[0].operation_name}</Nav.Link>}
                            {(clink2 === "") ? <></> :
                                <Nav.Link as={ Link } to={clink2}>{child_care[1].operation_name}</Nav.Link>}
                            {(clink3 === "") ? <></> : 
                                <Nav.Link as={ Link } to={clink3}>{child_care[2].operation_name}</Nav.Link>}
                            </Nav>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Jobs;