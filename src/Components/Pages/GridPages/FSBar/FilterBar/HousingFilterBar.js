// import './FilterBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

//Change values to queries
const HousingFilterBar = ({sendQuery}) => {
    const [form, setForm] = useState({
        'NumUnitsFilter': '', 
        'TenureFilter': '', 
        'UnitTypeFilter': '', 
        'ZipcodeFilter': '', 
        'GroundLeaseFilter': ''
    });

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    useEffect(() => {
        let isNotEmpty = form['NumUnitsFilter'] !== '';
        let filterQuery = form['NumUnitsFilter'];

        if ( isNotEmpty && form['TenureFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['TenureFilter'];
        isNotEmpty = isNotEmpty || form['TenureFilter'] !== '';

        if (isNotEmpty && form['UnitTypeFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['UnitTypeFilter'];
        isNotEmpty = isNotEmpty || form['UnitTypeFilter'] !== '';

        if (isNotEmpty && form['ZipcodeFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['ZipcodeFilter'];
        isNotEmpty = isNotEmpty || form['ZipcodeFilter'] !== '';

        if ( isNotEmpty && form['GroundLeaseFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['GroundLeaseFilter'];
        
        sendQuery(filterQuery);
    }, [form])

    return (
        <div style={{ textAlign:'center' }}>
            <h3>Filters:</h3>
            <Form>
                <Row className="g-3 justify-content-center" xs='auto'>
                    <Form.Group controlId='NumUnitsFilter' as={Col}>
                        <Form.Label>Number of Units</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('NumUnitsFilter', e.target.value)}
                        >
                            <option value=''>Select #Units</option>
                            <option value='total_affordable_units=0-5'>&lt;5</option>
                            <option value='total_affordable_units=5-10'>5-10</option>
                            <option value='total_affordable_units=10-50'>10-50</option>
                            <option value='total_affordable_units=50-100'>50-100</option>
                            <option value='total_affordable_units=100'>100+</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='TenureFilter' as={Col}>
                        <Form.Label>Tenure</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('TenureFilter', e.target.value)}
                        >
                            <option value=''>Select Tenure</option>
                            <option value='tenure=Rental'>Rental</option>
                            <option value='tenure=Ownership'>Ownership</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='UnitTypeFilter' as={Col}>
                        <Form.Label>Unit Type</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('UnitTypeFilter', e.target.value)}
                        >
                            <option value=''>Select Type</option>
                            <option value='unit_type=Single Family'>Single Family</option>
                            <option value='unit_type=Multifamily'>Multifamily</option>
                            <option value='unit_type=Duplex'>Duplex</option>
                            <option value='unit_type=FourPlex'>Fourplex</option>
                            <option value='unit_type=ADU'>ADU</option>
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
                    <Form.Group controlId='GroundLeaseFilter' as={Col}>
                        <Form.Label>Ground Lease</Form.Label>
                        <Form.Select 
                            className='filter_select'
                            onChange={e => setField('GroundLeaseFilter', e.target.value)}
                        >
                            <option value=''>Ground Lease</option>
                            <option value='ground_lease=Yes'>Available</option>
                            <option value='ground_lease=No'>Not Available</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
}

export default HousingFilterBar;