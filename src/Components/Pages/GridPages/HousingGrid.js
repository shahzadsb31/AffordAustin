import './Grid.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import FSBar from './FSBar/FSBar';
import HousingInstanceCard from './InstanceCards/HousingInstanceCard';
import { useSearchParams } from "react-router-dom";

const HousingGrid = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? 1);
    const [totalNumHouses, setTotalNumHouses] = useState(1);
    const [housesPerPage, setHousesPerPage] = useState(21);
    const [query, setQuery] = useState('');
    const [searchKeys, setSearchKeys] = useState([]);

    const getHousingData = useCallback (async () => {
        setLoading(true);
        let endpoint = `https://api.affordaustin.me/api/housing?page[size]=${housesPerPage}&page[number]=${currentPage}`;
        endpoint += (query === "") ? "" : "&" + query;
        const data = await axios.get(endpoint);
        setTotalNumHouses(data.data.metadata.total_count);
        setHouses(data.data.attributes);
        setLoading(false);
    }, [currentPage, housesPerPage, query]);

    useEffect(() => {
        getHousingData();
    }, [searchParams, currentPage, query, searchKeys, housesPerPage, getHousingData]);

    const paginate = (pageNum) => {
        setSearchParams({page: pageNum});
        setCurrentPage(pageNum);
    };

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
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <div className='grid mx-auto'>
                <Container fluid>
                    <Row>
                        <h1 className="grid_header">Housing</h1>
                    </Row>
                    <Row>
                        <FSBar totalInstances={totalNumHouses} pageLimit={housesPerPage} paginate={paginate} currentPage={currentPage} sendQuery={getQuery} model="Housing"/>
                    </Row>
                    <Row className="justify-content-center">
                        {loading ? <Spinner animation='border' role="status"/> : <></>}
                    </Row>
                    <Row className="g-3 justify-content-center" xs='auto'>
                        {loading ? <></> : houses.map(house => {
                            return (
                            <Col key={house.id}>
                                <HousingInstanceCard housing={house} housing_id={house.id} search_keys={searchKeys} />
                            </Col>);
                        })}
                    </Row>
                </Container>
            </div>
        </div>
        
    )
};

export default HousingGrid;