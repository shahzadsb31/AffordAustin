import './InstanceCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words'

const JobInstanceCard = ({ job, id, search_keys }) => {
    const link = `/Jobs/${ id }`;
    let schedule_type = (job.detected_extensions.length > 0) ? job.detected_extensions[0] : "N/A";

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
                <Card.Img variant='top' src={job._image}/>
                <Card.Body>
                    <Card.Title className="text-truncate">{ highlight(job.title) }</Card.Title>
                    <Card.Text><b>Company:</b> { highlight(job.company_name) }</Card.Text>
                    <Card.Text><b>Zip Code:</b> { highlight(job.zip_code) }</Card.Text>
                    <Card.Text><b>Schedule:</b> { highlight(schedule_type) }</Card.Text>
                    <Card.Text><b>Rating:</b> { highlight((job.rating === -1) ? "N/A" : job.rating) }</Card.Text>
                    <Card.Text><b>Reviews:</b> { highlight((job.reviews === "-1") ? "0" : job.reviews) }</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
};

export default JobInstanceCard;