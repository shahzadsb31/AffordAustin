// import './SortBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';

//Change values to queries
const JobSortBar = ({sendQuery}) => {
    const [isRating, setIsRating] = useState(false);
    const [isNumReviews, setIsNumReviews] = useState(false);
    const [isZip, setIsZip] = useState(false);
    const [isAscending, setIsAscending] = useState(false);
    const [ratingName, setRatingName] = useState("Rating");
    const [numReviewsName, setNumReviewsName] = useState("# Reviews");
    const [zipName, setZipName] = useState("Zip Code");
    const [query, setQuery] = useState("");

    const handleClick = (e) => {
        const button = e.target.value;
        setFilter(button);
    }

    const setFilter = useCallback((button) => {
        if (button === 'ratings') {
            if (!isRating) {
                setIsRating(true);
                setIsNumReviews(false);
                setIsZip(false);
                setIsAscending(true);
                setQuery("sort=rating");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort=-rating");
            } else {
                setIsRating(false);
                setQuery("");
            }
        } else if (button === 'num_reviews') {
            if (!isNumReviews) {
                setIsRating(false);
                setIsNumReviews(true);
                setIsZip(false);
                setIsAscending(true);
                setQuery("sort=reviews");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort=-reviews");
            } else {
                setIsNumReviews(false);
                setQuery("");
            }
        } else if (button === 'zip') {
            if (!isZip) {
                setIsRating(false);
                setIsNumReviews(false);
                setIsZip(true);
                setIsAscending(true);
                setQuery("sort=zip_code");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort=-zipcode");
            } else {
                setIsZip(false);
                setQuery("");
            }
        }
    }, [isRating, isNumReviews, isZip, isAscending]);

    useEffect(() => {
        setFilter('');
        setRatingName(isRating ? (isAscending ? "Rating ^": "Rating v") : "Rating");
        setNumReviewsName(isNumReviews ? (isAscending ? "# Reviews ^": "# Reviews v") : "# Reviews");
        setZipName(isZip ? (isAscending ? "Zip Code ^": "Zip Code v") : "Zip Code");
        sendQuery(query);
    }, [setFilter, isRating, isNumReviews, isZip, isAscending]);

    return (
        <Container>
            <Row className="g-3 justify-content-center" xs='auto'>
                <Col><h3>Sort By:</h3></Col>
                <Col>
                    <ButtonToolbar onClick={e =>{handleClick(e)}}>
                        <Button value='ratings' style={{margin:"0 10px"}}>{ratingName}</Button>
                        <Button value='num_reviews' style={{margin:"0 10px"}}>{numReviewsName}</Button>
                        <Button value='zip' style={{margin:"0 10px"}}>{zipName}</Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        </Container>
    );
}

export default JobSortBar;