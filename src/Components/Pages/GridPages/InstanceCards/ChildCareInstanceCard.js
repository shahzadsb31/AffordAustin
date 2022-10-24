import './InstanceCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import Highlighter from 'react-highlight-words';

const ChildCareInstanceCard = ({ child_care, id, search_keys }) => {
    const link = `/ChildCare/${ id }`;
    let ages = child_care.licensed_to_serve_ages.toString();
    ages = ages.replaceAll(',', ", ");
    let days = child_care.days_of_operation.toString();
    days = (days === "Mon,Tue,Wed,Thu,Fri") ? "Monday-Friday" : days.replaceAll(",", ", ");

    function highlight(text) {
        return (
          <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={search_keys}
            autoEscape={true}
            textToHighlight={String(text)}
          />
        );
    };
    
    return (
        <Link to={ link }>
            <Card className='c_inst_card'>
                <Card.Img variant='top' src={child_care._image} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ highlight(child_care.operation_name) }</Card.Title>
                    <Card.Text><b>Address:</b> { highlight(child_care.location_address) }</Card.Text>
                    <Card.Text><b>County:</b> { highlight(child_care.county) }</Card.Text>
                    <Card.Text><b>Days of Operation:</b> {highlight( days )}</Card.Text>
                    <Card.Text><b>Hours of Operation:</b> {highlight( child_care.hours_of_operation )}</Card.Text>
                    <Card.Text><b>Ages Served:</b> {highlight( ages )}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default ChildCareInstanceCard;