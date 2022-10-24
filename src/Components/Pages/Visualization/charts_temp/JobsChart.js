import './../Charts/Chart.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';

const JobsChart = () => {
    const [data, set_data] = useState(null);
    useEffect(() => {
        (async () => {
            const jobs_data = await axios.get(`https://api.affordaustin.me/api/jobs`);

            const zips = {};
    
            for (const data of jobs_data.data) {
                const zip_code = data['zip_code'];

                if (zip_code in zips) zips[zip_code] += 1;
                else                  zips[zip_code]  = 1;
            }
        
            const zips_array = [];
        
            for (const zip of Object.keys(zips))
                zips_array.push({ name: zip, x: zips[zip]});

            set_data(zips_array);
        })();
    });

    return (
        <div className="chart_div mx-auto">
            <h3 className="chart_title">Jobs per Zipcode</h3>
            <ResponsiveContainer width="100%" height={400} className="mx-auto">
                <LineChart width={730} height={250} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="x" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default JobsChart;