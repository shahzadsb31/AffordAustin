// import './FilterBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

//Change values to queries
const JobFilterBar = ({sendQuery}) => {
    const [form, setForm] = useState({
        'CompanyFilter': '', 
        'ScheduleTypeFilter': '', 
        'RatingFilter': '', 
        'NumReviewsFilter': '', 
        'ZipcodeFilter': ''
    });

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    useEffect(() => {
        let isNotEmpty = form['CompanyFilter'] !== '';
        let filterQuery = form['CompanyFilter'];

        if ( isNotEmpty && form['ScheduleTypeFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['ScheduleTypeFilter'];
        isNotEmpty = isNotEmpty || form['ScheduleTypeFilter'] !== '';

        if (isNotEmpty && form['RatingFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['RatingFilter'];
        isNotEmpty = isNotEmpty || form['RatingFilter'] !== '';

        if (isNotEmpty && form['NumReviewsFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['NumReviewsFilter'];
        isNotEmpty = isNotEmpty || form['NumReviewsFilter'] !== '';

        if ( isNotEmpty && form['ZipcodeFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['ZipcodeFilter'];
        
        sendQuery(filterQuery);
    }, [form])

    return (
        // Need query format for ScheduleTypeFilter
        <div style={{ textAlign:'center' }}>
            <h3>Filters:</h3>
            <Form>
                <Row className="g-3 justify-content-center" xs='auto'>
                    <Form.Group controlId='CompanyFilter' as={Col}>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Company Name'
                            className='filter_text'
                            // From https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    setField('CompanyFilter', (e.target.value == "") ? "" : "company_name=" + e.target.value);
                                }
                            }}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='ScheduleTypeFilter' as={Col}>
                        <Form.Label>Schedule Type</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('ScheduleTypeFilter', e.target.value)}
                        >
                            <option value=''>Pick Type</option>
                            <option value='schedule_type=Full-time'>Full-time</option>
                            <option value='schedule_type=Part-time'>Part-time</option>
                            <option value='schedule_type=Contractor'>Contractor</option>
                            <option value='schedule_type=Internship'>Internship</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='RatingFilter' as={Col}>
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('RatingFilter', e.target.value)}
                        >
                            <option value=''>Select Rating</option>
                            <option value='rating=0-1'>&lt;1</option>
                            <option value='rating=1-2'>1-2</option>
                            <option value='rating=2-3'>2-3</option>
                            <option value='rating=3-4'>3-4</option>
                            <option value='rating=4-5'>4-5</option>
                            <option value='rating=5'>5</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='NumReviewsFilter' as={Col}>
                        <Form.Label>Number of Reviews</Form.Label>
                        <Form.Select 
                            className='filter_select'
                            onChange={e => setField('NumReviewsFilter', e.target.value)}
                        >
                            <option value=''># Reviews</option>
                            <option value='reviews=0-10'>&lt;10</option>
                            <option value='reviews=10-50'>10-50</option>
                            <option value='reviews=50-100'>50-100</option>
                            <option value='reviews=100'>100+</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='ZipcodeFilter' as={Col}>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Zip Code'
                            className='filter_text'
                            // From https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    setField('ZipcodeFilter', (e.target.value == "") ? "" : "zip_code=" + e.target.value);
                                }
                            }}
                        />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
}

export default JobFilterBar;