import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IconSearch } from '@aws-amplify/ui-react';

const SearchBar = ({sendQuery}) => {
    const [form, setForm] = useState({});

    const setField = (field, value) => {
        setForm({...form,
        [field]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = (form['search'] === "") ? "" : "search=" + form['search'];
        sendQuery(query);
    }

    return (
        <Form onSubmit={e => {handleSubmit(e)}} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="search_bar"
                onChange={ e => setField('search', e.target.value)}
            />
            <Button type='submit' variant="outline-secondary" size='sm'><IconSearch /></Button>
        </Form>
    );
};

export default SearchBar;