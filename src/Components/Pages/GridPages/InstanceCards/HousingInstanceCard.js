import './InstanceCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';

const HousingInstanceCard = ({ housing, housing_id, search_keys}) => {
    const link = `/Housing/${ housing_id }`;

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
            <Card className='inst_card'>
                <Card.Img variant='top' src={housing._image} />
                <Card.Body>
                    <Card.Title className="text-truncate">{ highlight(housing.project_name) }</Card.Title>
                    <Card.Text><b>Tenure :</b> { highlight(housing.tenure) }</Card.Text>
                    <Card.Text><b>Unit-Type:</b> { highlight(housing.unit_type) }</Card.Text>
                    <Card.Text><b>Num of Affordable Units:</b> { highlight(housing.total_affordable_units) }</Card.Text>
                    <Card.Text><b>Ground Lease:</b> { highlight(housing.ground_lease) }</Card.Text>
                    <Card.Text><b>Zip-Code:</b> { highlight(housing.zip_code) }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default HousingInstanceCard;