import './Chart.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import { Form, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ScatterChart, XAxis, YAxis, ZAxis, Tooltip, Scatter, CartesianGrid, ResponsiveContainer, Label } from 'recharts';
  

const ProduceChart = () => {
    const [data, setData] = useState([]);
    const [firstNutrientType, setFirstNutrientType] = useState("produce_carbs");
    const [secondNutrientType, setSecondNutrientType] = useState("produce_protein");
    const [loading, setLoading] = useState(true);

    const getProduceData = useCallback (async () => {
        const result =  await axios.get("https://api.stay-fresh.me/products");
        setData(result.data.page);
        setLoading(false);
    }, []);

    useEffect(() => {
        if(loading) {
            getProduceData();
        }
    }, [firstNutrientType, secondNutrientType, getProduceData]);

    return (   
        <div className="chart_div mx-auto">
            <h3 className="chart_title">Produce Macronutrients</h3>
            <Form>
                <Row className="g-3 justify-content-center" xs='auto'>
                    <Form.Group controlId="FirstNutrientSelect" as={Col} className="chart_select">
                        <Form.Label>
                            Select Nutrient Type
                        </Form.Label>
                        <Form.Select onChange={(e) => setFirstNutrientType(e.target.value)}>
                            <option value="produce_carbs">Carbs</option>
                            <option value="produce_protein">Protein</option>
                            <option value="produce_fat">Fat</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="SecondNutrientSelect" as={Col} className="chart_select">
                        <Form.Label>
                            Select Nutrient Type
                        </Form.Label>
                        <Form.Select onChange={(e) => setSecondNutrientType(e.target.value)}>
                            <option value="produce_protein">Protein</option>
                            <option value="produce_carbs">Carbs</option>
                            <option value="produce_fat">Fat</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
            {!loading ? (
                <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart
                        data={data}
                        className="chart"
                        margin={{left: 15, bottom: 25}}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey={firstNutrientType}
                            name={firstNutrientType.slice(8)}
                            unit="g"
                            type="number"
                        >
                            <Label value={firstNutrientType.slice(8)} position='bottom' className="chart_label"/>
                        </XAxis>
                        <YAxis
                            dataKey={secondNutrientType}
                            unit="g"
                            name={secondNutrientType.slice(8)}
                            type="number"
                        >
                            <Label value={secondNutrientType.slice(8)} angle={-90} position='left' className="chart_label"/>
                        </YAxis>
                        
                        <ZAxis dataKey="produce_name" name="Produce Name"/>
                        <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                        <Scatter
                            name="Produce"
                            fill={(firstNutrientType === 'produce_carbs') ? '#8884d8' : ((firstNutrientType === 'produce_protein') ? '#82ca9d' : "#4287f5")}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            ) : <Spinner animation='border' role="status"/>}
        </div>
    );
    
};

export default ProduceChart;
