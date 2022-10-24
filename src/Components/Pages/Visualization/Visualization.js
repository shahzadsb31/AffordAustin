import './Visualization.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChildcareChart from './charts_temp/ChildcareChart';
import HousingChart from './charts_temp/HousingChart';
import JobsChart from './charts_temp/JobsChart';


const Visualization = () => {
    return (
        <div style={{ backgroundColor: "#f0f2f5" }}>
            <h1 className="v_header">Afford Austin Data</h1>
            <ChildcareChart />
            <HousingChart />
            <JobsChart />
        </div>
    );
};

export default Visualization;