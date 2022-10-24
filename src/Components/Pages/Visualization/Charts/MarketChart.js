import './Chart.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid, ResponsiveContainer, Label } from 'recharts';
  

const MarketChart = () => {
    const [data, setData] = useState([
        {'name': 'Texas', 'count': 0},
        {'name': 'California', 'count': 0},
        {'name': 'New York', 'count': 0},
        {'name': 'New Jersey', 'count': 0},
        {'name': 'Connecticut', 'count': 0},
        {'name': 'Rhode Island', 'count': 0}
    ]);
    const [loading, setLoading] = useState(true);

    const getMarketData = useCallback (async () => {
        let result =  await axios.get("https://api.stay-fresh.me/locations");
        result = result.data.page;
        let newData = data;
        result.map(location => {
            const address = location.location_address;
            if (address.includes("Texas")) {
                newData[0].count += 1;
            } else if (address.includes("California")) {
                newData[1].count += 1;
            } else if (address.includes("New York")) {
                newData[2].count += 1;
            } else if (address.includes("New Jersey")) {
                newData[3].count += 1;
            } else if (address.includes("Connecticut")) {
                newData[4].count += 1;
            } else if (address.includes("Rhode Island")) {
                newData[5].count += 1;
            }
        });
        setData(newData);
        setLoading(false);
    }, []);

    useEffect(() => {
        if(loading) {
            getMarketData();
        }
    }, [getMarketData]);

    return (   
        <div className="chart_div mx-auto">
            <h3 className="chart_title">Market Locations</h3>
                {!loading ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart 
                            data={data} 
                            className="chart"
                            margin={{left: 15, bottom: 25}}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name">
                                <Label value="State" position='bottom' className="chart_label"/>
                            </XAxis>
                            <YAxis dataKey="count" ticks={[5, 10, 15, 20, 25, 30, 35, 40]}>
                                <Label value="Number of Markets" position='left' angle={-90} className="chart_label"/>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="count" fill='#FAC898' />
                        </BarChart>
                    </ResponsiveContainer>
                ) : <Spinner animation='border' role="status"/>}
        </div>
    );
    
};

export default MarketChart;
