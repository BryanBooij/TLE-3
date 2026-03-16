import '../App.css'
import '../index.css'
import './styleLeermoduleAdmin.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

function LeermoduleAdmin() {
    const navigate = useNavigate()
    const [leermodules, setLeermodule] = useState(null);

    /*⭐: This still needs some testin*/
    useEffect(()=> {
    async function fetchLeermodules() {
            try {
                const response = await fetch("http://145.24.237.168:8000/quizzes", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });
                const data = await response.json();
                console.log(data); //⭐: This is here for testing purposes, if works, delete
                setLeermodule(data.items);
                if (!data) { //⭐: if no data is returned
                    console.log("Seems we couldn't find any data");
                }
            } catch (error) { //⭐: if an error is returned
                console.error("There was a problem: ", error)
            }
        }
        fetchLeermodules(); //⭐: calls the function that gets the data
    }, []);


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
                            <ButtonGreen className="detailButton" alt="Filter A" label="FilterA" onClick={() => navigate("")} />
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
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details/" + 1)} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details/" + 2)} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details/" + 3)} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details/" + 4)} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details/" + 5)} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details/" + 6)} />
                </tr>
                <tr>
                    <td>Data_1</td>
                    <td>Data_2</td>
                    <td>10x</td>
                    <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate("/Leermodule/details/")} />
                </tr>
                </tbody>
            </table>
        </div>
    </>
)
}

export default LeermoduleAdmin
