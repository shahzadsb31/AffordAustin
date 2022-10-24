import './Visualization.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import RecipeChart from './Charts/RecipeChart';
import ProduceChart from './Charts/ProduceChart';
import MarketChart from './Charts/MarketChart';

const ProviderVisualization = () => {
    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <h1 className="v_header">Stay Fresh Visualizations</h1>
            <RecipeChart />
            <MarketChart />
            <ProduceChart />
        </div>
    );
};

export default ProviderVisualization;