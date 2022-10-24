import './../Charts/Chart.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FunnelChart, Tooltip, Funnel, LabelList, ResponsiveContainer } from 'recharts';

const ChildcareChart = () => {
    const [data, set_data] = useState(null);
    useEffect(() => {
        (async () => {
            const SERVICES = ['Pre-Kindergarten', 'School', 'Toddler', 'Infant'];
            const COLORS = ['#809bce', '#95b8d1', '#b8e0d2', '#d6eadf'];
            const childcare_data = await axios.get(`https://api.affordaustin.me/api/childcare`);

            const childcare = {};

            for (const service of SERVICES)
                childcare[service] = 0;

            for (const data of childcare_data.data)
                for (const service of data['licensed_to_serve_ages'])
                    childcare[service] += 1;

            const childcare_array = [];

            for (let index = 0; index < SERVICES.length; ++index) {
                childcare_array.push({ 
                    value: childcare[SERVICES[index]],
                    name: SERVICES[index],
                    fill: COLORS[index]
                });
            }

            set_data(childcare_array);
        })();
    });

    return (
        <div className="chart_div mx-auto">
            <h3 className="chart_title">Ages Served</h3>
            <ResponsiveContainer width="75%" height={400} className="mx-auto">
                <FunnelChart width={730} height={250} className="chart">
                    <Tooltip />
                    <Funnel
                        dataKey="value"
                        data={data}
                        isAnimationActive
                    >
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                    </Funnel>
                </FunnelChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChildcareChart;