import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react';
import FSBar from './FSBar/FSBar';
import axios from 'axios';
import JobInstanceCard from './InstanceCards/JobInstanceCard';
import { useSearchParams } from "react-router-dom";

const JobGrid = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? 1);
    const [totalNumJobs, setTotalNumJobs] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(21);
    const [query, setQuery] = useState('');
    const [searchKeys, setSearchKeys] = useState([]);

    const getJobData = useCallback (async () => {
        setLoading(true);
        let endpoint = `https://api.affordaustin.me/api/jobs?page[size]=${jobsPerPage}&page[number]=${currentPage}`;
        endpoint += (query === "") ? "" : "&" + query;
        const data = await axios.get(endpoint);
        setTotalNumJobs(data.data.metadata.total_count);
        setJobs(data.data.attributes);
        setLoading(false);
    }, [currentPage, jobsPerPage, query]);

    useEffect(() => {
        getJobData('');
    }, [searchParams, currentPage, query, searchKeys, getJobData]);

    const paginate = (pageNum) => {
        setSearchParams({page: pageNum});
        setCurrentPage(pageNum);
    }

    const getQuery = (new_query, new_search_query) => {
        let full_query = new_query;
        if (full_query !== "" && new_search_query != ""){
            full_query += "&";
        }
        full_query += new_search_query;
        setQuery(full_query);
        let search_query = (new_search_query === "") ? [] : new_search_query.slice(7).split(" ");
        setSearchKeys(search_query);
        setSearchParams({page: 1});
        if (full_query !== query) {
            setCurrentPage(1);
        }
    };

    return (
        <div className='grid mx-auto'>
            <Container fluid>
                <Row>
                    <h1 className='grid_header'>Jobs</h1>
                </Row>
                <Row>
                    <FSBar totalInstances={totalNumJobs} pageLimit={jobsPerPage} paginate={paginate} currentPage={currentPage} sendQuery={getQuery} model="Job"/>
                </Row>
                <Row className="justify-content-center">
                    {loading ? <Spinner animation='border' role="status"/> : <></>}
                </Row>
                <Row className="g-3 justify-content-center" xs='auto'>
                    {loading ? <></> : jobs.map(job => {
                        return (
                        <Col key={job.id}>
                            <JobInstanceCard job={job} id={job.id}search_keys={searchKeys} />
                        </Col>);
                    })}
                </Row>
            </Container>
        </div>
    )
};

export default JobGrid;