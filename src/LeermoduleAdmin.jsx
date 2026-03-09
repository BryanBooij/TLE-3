import './App.css'
import './index.css'
import './styleLeermoduleAdmin.css'
import {Link} from "react-router";
import ButtonGreen from "./buttons/ButtonGreen.jsx";

function LeermoduleAdmin() {

return (
    <>
        <div id="topTable">
        <h1>Leermodules</h1>

        <div id="filterHolder">
                <a href="" id="newModule">
                    <h2>Make new module &#10009;</h2>
                </a>

            <div className="dropdown">
                <h2>Filters</h2>
                <div className="dropdown-content">
                    <button>Filter A</button>
                    <button>Filter B</button>
                    <button>Filter C</button>
                    <button>Filter D</button>
                    <button>Filter E</button>
                    <button>Apply</button>
                </div>
            </div>
        </div>
        </div>

        <table>
            <thead>
            <tr>
                <th>Created on</th>
                <th>Name learn module</th>
                <th>Times played</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/")} />
            </tr>
            </tbody>
        </table>
    </>
)
}

export default LeermoduleAdmin
