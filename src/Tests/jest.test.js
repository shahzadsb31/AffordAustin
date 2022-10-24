import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import About from "../Components/Pages/About/About";
import GitTotals from "../Components/Pages/About/GitTotals/GitTotals";
import Home from "../Components/Pages/Home/Home";
import Housing from "../Components/Pages/InstancePages/Housing";
import ChildCare from "../Components/Pages/InstancePages/ChildCare";
import Jobs from "../Components/Pages/InstancePages/Jobs";

import Navbar from "../Components/MainNavBar/MainNavBar";

import ChildCareGrid from "../Components/Pages/GridPages/ChildCareGrid";
import HousingGrid from "../Components/Pages/GridPages/HousingGrid";
import JobGrid from "../Components/Pages/GridPages/JobGrid";

import SearchPage from "../Components/Pages/Search/SearchPage";

import ChildcareFilterBar from "../Components/Pages/GridPages/FSBar/FilterBar/ChildcareFilterBar";
import HousingFilterBar from "../Components/Pages/GridPages/FSBar/FilterBar/HousingFilterBar";
import JobFilterBar from "../Components/Pages/GridPages/FSBar/FilterBar/JobFilterBar";

import ChildcareSortBar from "../Components/Pages/GridPages/FSBar/SortBar/ChildcareSortBar";
import HousingSortBar from "../Components/Pages/GridPages/FSBar/SortBar/HousingSortBar";
import JobSortBar from "../Components/Pages/GridPages/FSBar/SortBar/JobSortBar";

import FSBar from "../Components/Pages/GridPages/FSBar/FSBar";
import Pagination from "../Components/Pages/GridPages/FSBar/Pagination";

configure({ adapter: new Adapter() });

describe("Render components", () => {
  it("1. render About page", () => {
    const tree = shallow(<About />);
    expect(tree).toMatchSnapshot();
  });

  it("2. Home match snapshot", () => {
    const home = shallow(<Home />);
    expect(home).toBeDefined();
  });

  it("3. GitTotals match snapshot", () => {
    const gittotals = shallow(<GitTotals />);
    expect(gittotals).toBeDefined();
  });

  it("4. Housing matches snapshot", () => {
    const tree = shallow(<Housing />);
    expect(tree).toMatchSnapshot();
  });

  it("5. ChildCare matches snapshot", () => {
    const tree = shallow(<ChildCare />);
    expect(tree).toMatchSnapshot();
  });

  it("6. Jobs matches snapshot", () => {
    const tree = shallow(<Jobs />);
    expect(tree).toMatchSnapshot();
  });

  it("7. Navbar matches snapshot", () => {
    const navbar = shallow(<Navbar />);
    expect(navbar).toMatchSnapshot();
  });

  it("11. Searching page matches snapshot", () => {
    const searchpage = shallow(<SearchPage />);
    expect(searchpage).toMatchSnapshot();
  });

  it("12. ChildcareFilterBar matches snapshot", () => {
    const ccfilterbar = shallow(<ChildcareFilterBar />);
    expect(ccfilterbar).toMatchSnapshot();
  });

  it("13. HousingFilterBar matches snapshot", () => {
    const hbar = shallow(<HousingFilterBar />);
    expect(hbar).toMatchSnapshot();
  });

  it("14. JobFilterBar matches snapshot", () => {
    const jbar = shallow(<JobFilterBar />);
    expect(jbar).toMatchSnapshot();
  });

  it("15. ChildcareSortBar matches snapshot", () => {
    const ccfilterbar = shallow(<ChildcareSortBar />);
    expect(ccfilterbar).toMatchSnapshot();
  });

  it("16. HousingSortBar matches snapshot", () => {
    const hbar = shallow(<HousingSortBar />);
    expect(hbar).toMatchSnapshot();
  });

  it("17. JobSortBar matches snapshot", () => {
    const jbar = shallow(<JobSortBar />);
    expect(jbar).toMatchSnapshot();
  });

  it("18. FSBar matches snapshot", () => {
    const fsbar = shallow(<FSBar />);
    expect(fsbar).toMatchSnapshot();
  });

  it("19. Pagination matches snapshot", () => {
    const pag = shallow(<Pagination />);
    expect(pag).toMatchSnapshot();
  });
});
