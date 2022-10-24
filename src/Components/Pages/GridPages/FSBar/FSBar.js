import './FSBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import Paginate from './Pagination';
import HousingFilterBar from './FilterBar/HousingFilterBar';
import JobFilterBar from './FilterBar/JobFilterBar';
import ChildcareFilterBar from './FilterBar/ChildcareFilterBar';
import HousingSortBar from './SortBar/HousingSortBar';
import JobSortBar from './SortBar/JobSortBar';
import ChildcareSortBar from './SortBar/ChildcareSortBar';
import SearchBar from './SearchBar';
import { Container, Row, Col } from 'react-bootstrap';

const FSBar = ({totalInstances, pageLimit, paginate, currentPage, sendQuery, initialQuery, model}) => {
    if (initialQuery != undefined) {
        let arrayQuery = initialQuery.split("&");
        initialQuery = {};
        for (let q of arrayQuery) {
            const x = q.split("=");
            initialQuery[x[0]] = q;
        };
    }

    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const getQuery = useCallback(() => {
        let fullQuery = filterQuery;
        if (filterQuery !== '' && sortQuery !== '') {
            fullQuery += '&';
        }
        fullQuery += sortQuery;
        sendQuery(fullQuery, searchQuery);
    }, [filterQuery, sortQuery, searchQuery]);

    const updateFilterQuery = (query) => {
        setFilterQuery(query);
    }

    const updateSortQuery = (query) => {
        setSortQuery(query);
    }

    const updateSearchQuery = (query) => {
        setSearchQuery(query);
    }

    useEffect(() => {
        getQuery();
    }, [filterQuery, sortQuery, searchQuery, getQuery])

    const first_result = ((currentPage - 1) * pageLimit) + 1;
    const last_result = (totalInstances / pageLimit > currentPage) ? (first_result + pageLimit - 1) : (first_result - 1 + totalInstances % pageLimit);
    return (
        <Container className='grid_fs_bar'>
            <Row className='grid_filters'><FilterBar sendQuery={updateFilterQuery} model={model} initialQuery={initialQuery} /></Row>
            <Row className='grid_sorters'><SortBar sendQuery={updateSortQuery} model={model} /></Row>
            <Row className='grid_ps_bar' xs='auto'>
                <Col style={{marginRight:'auto'}}><Paginate totalInstances={totalInstances} pageLimit={pageLimit} paginate={paginate} page={currentPage}/></Col>
                <Col><h3>Showing Results {first_result}-{last_result} of {totalInstances}</h3></Col>
                <Col style={{marginLeft:'auto'}}><SearchBar sendQuery={updateSearchQuery}/></Col>
            </Row>
        </Container>
    );
}

const FilterBar = ({sendQuery, model, initialQuery}) => {
    if (model === "Housing") {
        return <HousingFilterBar sendQuery={sendQuery} />;
    } else if (model === "Childcare") {
        return <ChildcareFilterBar sendQuery={sendQuery} initialQuery={initialQuery} />;
    } else {
        return <JobFilterBar sendQuery={sendQuery} />;
    }
}

const SortBar = ({sendQuery, model}) => {
    if (model === "Housing") {
        return <HousingSortBar sendQuery={sendQuery} />;
    } else if (model === "Childcare") {
        return <ChildcareSortBar sendQuery={sendQuery} />;
    } else {
        return <JobSortBar sendQuery={sendQuery} />;
    }
};

export default FSBar;