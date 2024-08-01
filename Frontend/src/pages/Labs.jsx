import Header from "../components/header/Header";
import Table from "../components/Table/Table";
import Select from "../components/Select/Select";

import './Labs.css';

function Labs() {
    return (
        <div className="App">
            <Header Labs={true}/>
            <div className="select_main">
                <Select LabAtu={1} Type={"lab"}/>
                <Select LabAtu={1} Type={"date"}/>
            </div>
            <Table />
        </div>
    );
}

export default Labs;
