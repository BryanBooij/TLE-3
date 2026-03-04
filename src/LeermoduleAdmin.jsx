import './App.css'
import {useState} from "react";
import './index.css'
import './styleLeermoduleAdmin.css'

function LeermoduleAdmin() {

return (
    <>
        <h1>Leermodules</h1>

        <div id="filterHolder">
            <a href="" id="newModule">
                <h2>Make new module &#10009;</h2>
                <img src="" alt="Plus icon"/>
            </a>

            <div className="dropdown"><h3>Filters</h3>
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

        <table>
            <tr>
                <th>Created on</th>
                <th>Name learn module</th>
                <th>Times played</th>
                <th></th>
            </tr>

            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <button>Details</button>
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <button>Details</button>
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <button>Details</button>
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <button>Details</button>
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <button>Details</button>
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <button>Details</button>
            </tr>
            <tr>
                <td>Data_1</td>
                <td>Data_2</td>
                <td>10x</td>
                <button>Details</button>
            </tr>

        </table>
    </>
)
}

export default LeermoduleAdmin
