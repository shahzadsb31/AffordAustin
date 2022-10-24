import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MainNavBar from "./Components/MainNavBar/MainNavBar";

import Home from "./Components/Pages/Home/Home";
import Housing from "./Components/Pages/InstancePages/Housing"
import HousingGrid from "./Components/Pages/GridPages/HousingGrid"
import ChildCare from "./Components/Pages/InstancePages/ChildCare";
import ChildCareGrid from "./Components/Pages/GridPages/ChildCareGrid";
import Job from "./Components/Pages/InstancePages/Jobs"
import JobGrid from "./Components/Pages/GridPages/JobGrid"
import About from "./Components/Pages/About/About";
import PageNotFound from "./Components/PageNotFound";
import SearchPage from "./Components/Pages/Search/SearchPage"
import Visualization from "./Components/Pages/Visualization/Visualization";
import ProviderVisualization from "./Components/Pages/Visualization/ProviderVisualizations"

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <MainNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />

          <Route path="/Jobs" element={<JobGrid />} />
          <Route path="/Jobs/:id" element={<Job />} />

          <Route path="/Housing" element={<HousingGrid />} />
          <Route path="/Housing/:id" element={<Housing />}/>

          <Route path="/ChildCare" element={<ChildCareGrid />} />
          <Route path="/ChildCare/:id" element={<ChildCare />} />

          <Route path="/Search" element={<SearchPage />} />
          <Route path="/Visualizations" element={<Visualization />} />
          <Route path="/ProviderVisualizations" element={<ProviderVisualization />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
