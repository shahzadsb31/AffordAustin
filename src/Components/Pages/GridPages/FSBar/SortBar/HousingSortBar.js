// import './SortBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';

//Change values to queries
const HousingSortBar = ({sendQuery}) => {
    const [isNumUnits, setIsNumUnits] = useState(false);
    const [isUnitType, setIsUnitType] = useState(false);
    const [isZip, setIsZip] = useState(false);
    const [isAscending, setIsAscending] = useState(false);
    const [numUnitsName, setNumUnitsName] = useState("# Units");
    const [unitTypeName, setUnitTypeName] = useState("Unit Type");
    const [zipName, setZipName] = useState("Zip Code");
    const [query, setQuery] = useState("");

    const handleClick = (e) => {
        const button = e.target.value;
        setFilter(button);
    }

    const setFilter = useCallback((button) => {
        if (button === 'num_units') {
            if (!isNumUnits) {
                setIsNumUnits(true);
                setIsUnitType(false);
                setIsZip(false);
                setIsAscending(true);
                setQuery("sort=total_affordable_units");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort=-total_affordable_units");
            } else {
                setIsNumUnits(false);
                setQuery("");
            }
        } else if (button === 'unit_type') {
            if (!isUnitType) {
                setIsNumUnits(false);
                setIsUnitType(true);
                setIsZip(false);
                setIsAscending(true);
                setQuery("sort=unit_type");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort=-unit_type");
            } else {
                setIsUnitType(false);
                setQuery("");
            }
        } else if (button === 'zip') {
            if (!isZip) {
                setIsNumUnits(false);
                setIsUnitType(false);
                setIsZip(true);
                setIsAscending(true);
                setQuery("sort=zip_code");
            } else if (isAscending){
                setIsAscending(false);
                setQuery("sort=-zip_code");
            } else {
                setIsZip(false);
                setQuery("");
            }
        }
    }, [isNumUnits, isUnitType, isZip, isAscending]);

    useEffect(() => {
        setFilter('');
        setNumUnitsName(isNumUnits ? (isAscending ? "# Units ^": "# Units v") : "# Units");
        setUnitTypeName(isUnitType ? (isAscending ? "Units Type ^": "Units Type v") : "Units Type");
        setZipName(isZip ? (isAscending ? "Zip Code ^": "Zip Code v") : "Zip Code");
        sendQuery(query);
    }, [setFilter, isNumUnits, isUnitType, isZip, isAscending]);

    return (
        <Container>
            <Row className="g-3 justify-content-center" xs='auto'>
                <Col><h3>Sort By:</h3></Col>
                <Col>
                    <ButtonToolbar onClick={e =>{handleClick(e)}}>
                        <Button value='num_units' style={{margin:"0 10px"}}>{numUnitsName}</Button>
                        <Button value='unit_type' style={{margin:"0 10px"}}>{unitTypeName}</Button>
                        <Button value='zip' style={{margin:"0 10px"}}>{zipName}</Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        </Container>
    );
}

export default HousingSortBar;