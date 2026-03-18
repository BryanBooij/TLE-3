import '../App.css'
import '../index.css'
import './styleLeermoduleAdmin.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import ButtonPurple from "../buttons/ButtonPurple.jsx";

function LeermoduleAdmin() {
    const navigate = useNavigate()
    const [leermodules, setLeermodule] = useState(null);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setLeermodule(data.items);
                if (!data) { //⭐: if no data is returned
                }
            } catch (error) { //⭐: if an error is returned
                console.error("There was a problem: ", error)
            }
        }
        fetchLeermodules(); //⭐: calls the function that gets the data
    }, []);

    useEffect(() => {
        fetch("http://145.24.237.168:8000/learningModules", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                setModules(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading modules...</p>;
    if (modules.length === 0) return <p>No learning modules found.</p>;

    return (
    <>
        <div id="leermoduleContainer">
            <div id="topTable">
                <h1>Leermodules</h1>
                <div id="filterHolder">
                    <a href="Leermodule/create" id="newModule">
                        <h2>Make new module &#10009;</h2>
                    </a>
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
                {modules.map((mod) => (
                    <tr key={mod.id}>
                        <td>{mod.created_at}</td>
                        <td>{mod.name}</td>
                        <td>{mod.times_played || 0}x</td>
                        <td>
                            <ButtonGreen className="detailButton" alt="Details" label="Details" onClick={() => navigate(`/Leermodule/details/${mod.id}`)}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
)
}

export default LeermoduleAdmin
