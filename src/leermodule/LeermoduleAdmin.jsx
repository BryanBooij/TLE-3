import '../App.css'
import '../index.css'
import './styleLeermoduleAdmin.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";

function LeermoduleAdmin() {

return (
    <>
        <div id="leermoduleContainer">
            <div id="topTable">
                <h1>Leermodules</h1>

                <div id="filterHolder">
                        <a href="Leermodule/create" id="newModule">
                            <h2>Make new module &#10009;</h2>
                        </a>

                    <div className="dropdown">
                        <h2>Filters</h2>
                        <div className="dropdown-content">
                            <ButtonGreen className="detailButton" alt="Filter A" label="FilterA" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Filter B" label="FilterB" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Filter C" label="FilterC" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Filter D" label="FilterD" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Filter E" label="FilterB" onClick={() => navigate("/")} />
                            <ButtonGreen className="detailButton" alt="Apply" label="Apply" onClick={() => navigate("/")} />
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
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details")} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details")} />
                </tr>
                </tbody>
            </table>
        </div>
    </>
)
}

export default LeermoduleAdmin
