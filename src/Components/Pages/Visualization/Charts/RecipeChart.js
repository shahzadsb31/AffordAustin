import './Chart.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useCallback } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RecipeChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const COLORS =['#6A28FA', '#B0E673', '#49AAE6', '#4CACC7', '#DB342E', 
                    '#CSFC74', '#3A0A82', '#9EBF65', '#8A7160', '#9E974C',
                    '#838751', '#401611', '#571D1F', '#F22260', '#3E0885',
                    '#801752', '#DE8264', '#917A50', '#495934', '#BFA195']

    const getRecipeData = useCallback (async () => {
        let result =  await axios.get("https://api.stay-fresh.me/recipes");
        result = result.data.page;
        let newData = data;
        result.map(recipe => {
            const r_type = recipe.recipe_type;
            const already_exists = newData.some(cuisine => {
                if (cuisine.label === r_type) {
                    cuisine.value += 1;
                    return true;
                }
                return false;
            });

            if (!already_exists) {
                newData.push({'label': r_type, 'value': 1});
            }
        });
        setData(newData);
        setLoading(false);
    }, []);

    useEffect(() => {
        if(loading) {
            getRecipeData();
        }
    }, [getRecipeData]);

    return (   
        <div className="chart_div mx-auto">
            <h3 className="chart_title">Recipe Types</h3>
                {!loading ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart className="chart">
                            <Pie
                                data={data}
                                align="left"
                                wrapperStyle={{paddingLeft: "20%"}}
                                innerRadius={60}
                                outerRadius={140}
                                paddingAngle={1}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} name={entry.label} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Legend 
                                align="right" 
                                verticalAlign="middle" 
                                layout="vertical"
                                wrapperStyle={{paddingRight: "30%"}} />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : <Spinner animation='border' role="status"/>}
        </div>
    );
    
};

export default RecipeChart;
