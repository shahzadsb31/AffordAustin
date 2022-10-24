// import './FilterBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

//Change values to queries
const ChildcareFilterBar = ({sendQuery, initialQuery}) => {
    const x = {
            'ZipcodeFilter': '', 
            'CountyFilter': '',
            'HoursFilterStarting': '',
            'HoursFilterEnding': '', 
            'AgesFilter': ''
        };

    const [form, setForm] = useState(x);
    
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    useEffect(() => {
        let isNotEmpty = form['ZipcodeFilter'] !== '';
        let filterQuery = form['ZipcodeFilter'];

        if ( isNotEmpty && form['CountyFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['CountyFilter'];
        isNotEmpty = isNotEmpty || form['CountyFilter'] !== '';

        if (isNotEmpty && form['HoursFilterStarting'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['HoursFilterStarting'];
        isNotEmpty = isNotEmpty || form['HoursFilterStartin'] !== '';

        if (isNotEmpty && form['HoursFilterEnding'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['HoursFilterEnding'];
        isNotEmpty = isNotEmpty || form['HoursFilterEnding'] !== '';

        if ( isNotEmpty && form['AgesFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['AgesFilter'];
        
        sendQuery(filterQuery);
    }, [form])

    return (
        <div style={{ textAlign:'center' }}>
            <h3>Filters:</h3>
            <Form>
                <Row className="g-3 justify-content-center" xs='auto'>
                    <Form.Group controlId='ZipcodeFilter' as={Col}>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Find center near'
                            className='filter_text'
                            // From https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    setField('ZipcodeFilter', (e.target.value == "") ? "" : "zip_code=" + e.target.value);
                                }
                            }}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='CountyFilter' as={Col}>
                        <Form.Label>County</Form.Label>
                        <Form.Control
                            as="select"
                            className='filter_select'
                            onChange={e => setField('CountyFilter', e.target.value)}
                            defaultValue={form['CountyFilter']}
                        >
                            <option value=''>Select County</option>
                            <option value='county=Bastrop'>Bastrop</option>
                            <option value='county=Caldwell'>Caldwell</option>
                            <option value='county=Hays'>Hays</option>
                            <option value='county=Travis'>Travis</option>
                            <option value='county=Williamson'>Williamson</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='HoursFilter' as={Col}>
                        <Form.Label>Hours of Operation</Form.Label>
                        <Row>
                            <Col>
                                <Form.Select
                                    className='filter_select'
                                    onChange={e => setField('HoursFilterStarting', e.target.value)}
                                >
                                    <option value=''></option>
                                    <option value='start_hours_val=6'>6 am</option>
                                    <option value='start_hours_val=7'>7 am</option>
                                    <option value='start_hours_val=8'>8 am</option>
                                    <option value='start_hours_val=9'>9 am</option>
                                    <option value='start_hours_val=14'>2 pm</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select
                                    className='filter_select'
                                    onChange={e => setField('HoursFilterEnding', e.target.value)}
                                >
                                    <option value=''></option>
                                    <option value='end_hours_val=13'>1 pm</option>
                                    <option value='end_hours_val=14'>2 pm</option>
                                    <option value='end_hours_val=15'>3 pm</option>
                                    <option value='end_hours_val=16'>4 pm</option>
                                    <option value='end_hours_val=17'>5 pm</option>
                                    <option value='end_hours_val=18'>6 pm</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId='AgesFilter' as={Col}>
                        <Form.Label>Age Group</Form.Label>
                        <Form.Select 
                            className='filter_select'
                            onChange={e => setField('AgesFilter', e.target.value)}
                        >
                            <option value=''>Select Age Group</option>
                            <option value='licensed_to_serve_ages=Infant'>Infant</option>
                            <option value='licensed_to_serve_ages=Toddler'>Toddler</option>
                            <option value='licensed_to_serve_ages=Pre-Kindergarten'>Pre-Kindergarten</option>
                            <option value='licensed_to_serve_ages=School'>School</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
}

export default ChildcareFilterBar;