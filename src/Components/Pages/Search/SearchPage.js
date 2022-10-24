import './SearchPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ChildCareInstanceCard from '../GridPages/InstanceCards/ChildCareInstanceCard';
import JobInstanceCard from '../GridPages/InstanceCards/JobInstanceCard';
import HousingInstanceCard from '../GridPages/InstanceCards/HousingInstanceCard';
import SearchBar from './../GridPages/FSBar/SearchBar';

const SearchPage = () => {
    const [cPrograms, setCPrograms] = useState([]);
    const [houses, setHouses] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("search=");
    const [searchKeys, setSearchKeys] = useState([]);
    const getSearchData = useCallback (async () => {
        setLoading(true);
        if (query !== "search=") {
            const endpoint1 = `https://api.affordaustin.me/api/childcare?page[size]=100&page[number]=1&` + query;
            const endpoint2 = `https://api.affordaustin.me/api/housing?page[size]=100&page[number]=1&` + query;
            const endpoint3 = `https://api.affordaustin.me/api/jobs?page[size]=100&page[number]=1&` + query;
            let data = await axios.get(endpoint1);
            setCPrograms(data.data.attributes);
            data = await axios.get(endpoint2);
            setHouses(data.data.attributes);
            data = await axios.get(endpoint3);
            setJobs(data.data.attributes);
            setSearchKeys(query.slice(7).split(" "));
        } else {
            setCPrograms([]);
            setHouses([]);
            setJobs([]);
            setSearchKeys([]);
        }
        setLoading(false);
    }, [query]);

    useEffect(() => {
        getSearchData();
    }, [query, getSearchData]);

    const getQuery = (new_query) => {
        setQuery(new_query);
    };

    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className='search_page mx-auto'>
                <h1 className='search_header'>Search</h1>
                <div className='search_page_bar'><SearchBar sendQuery={getQuery} /></div>
                {loading ? <Spinner animation='border' role="status"/> : <></>}
                <div className='search_grid mx-auto'>
                    <Container fluid>
                        <Row>
                            <h3 className='search_section_header'>Child Care</h3>
                        </Row>
                        <Row className="g-3 justify-content-center" xs='auto'>
                            {loading ? <></> : ((cPrograms.length < 1) ? <h3>No results</h3> : 
                                cPrograms.map(program => {
                                    return (
                                    <Col key={program.id}>
                                        <ChildCareInstanceCard child_care={program} id={program.id} search_keys={searchKeys}/>
                                    </Col>);
                                }))}
                        </Row>
                    </Container>
                </div>
                <div className='search_grid mx-auto'>
                    <Container fluid>
                        <Row>
                            <h3 className='search_section_header'>Housing</h3>
                        </Row>
                        <Row className="g-3 justify-content-center" xs='auto'>
                            {loading ? <></> : ((houses.length < 1) ? <h3>No results</h3> :
                                houses.map(house => {
                                    return (
                                    <Col key={house.id}>
                                        <HousingInstanceCard housing={house} housing_id={house.id} search_keys={searchKeys} />
                                    </Col>);
                                }))}
                        </Row>
                    </Container>
                </div>
                <div className='search_grid mx-auto'>
                    <Container fluid>
                        <Row>
                            <h3 className='search_section_header'>Jobs</h3>
                        </Row>
                        <Row className="g-3 justify-content-center" xs='auto'>
                            {loading ? <></> : ((jobs.length < 1) ? <h3>No results</h3> :
                                jobs.map(job => {
                                    return (
                                    <Col key={job.id}>
                                        <JobInstanceCard job={job} id={job.id} search_keys={searchKeys} />
                                    </Col>);
                                }))}
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default SearchPage
