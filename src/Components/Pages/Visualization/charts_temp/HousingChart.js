import './../Charts/Chart.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar, RadarChart, PolarGrid,
	PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const HousingChart = () => {
    const [data, set_data] = useState(null);
    useEffect(() => {
        (async () => {
            const PERCENTS = [30, 40, 50, 60, 65, 80, 100];
            const housing_data = await axios.get(`https://api.affordaustin.me/api/housing`);

            const houses = {};

            for (const percent of PERCENTS)
                houses[`${percent}%`] = 0;
    
            for (const data of housing_data.data)
                for (const percent of PERCENTS)
                    houses[`${percent}%`] += data[`units_${percent}_mfi`];
        
            const houses_array = [];
        
            for (const house of Object.keys(houses))
                houses_array.push({ name: house, x: houses[house]});

            set_data(houses_array);
        })();
    });

    return (
        <div className="chart_div mx-auto">
            <h3 className="chart_title">Units Restricted to % of Median Family Income</h3>
            <ResponsiveContainer width="100%" height={400} className="mx-auto">
                <RadarChart height={500} width={500} outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar dataKey="x" stroke="red"
                        fill="red" fillOpacity={0.6} />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HousingChart;