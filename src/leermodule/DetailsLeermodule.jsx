import '../App.css';
import '../index.css';
import { useParams } from "react-router-dom";
import './styleLeermoduleAdmin.css';
import '../buttons/ButtonPurple.jsx';
import ButtonPurple from "../buttons/ButtonPurple.jsx";
import ButtonBlack from "../buttons/ButtonBlack.jsx";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

function DetailsLeermodule() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [moduleData, setModuleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Message, setMessage] = useState("");

    useEffect(() => {
        fetch(`http://145.24.237.168:8000/learningModules/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log("Module data:", data);
                setModuleData({
                    ...data,
                    questions: data.questions || []
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setModuleData({ questions: [] });
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading module data...</p>;
    if (!moduleData) return <p>Module not found</p>;

    const handleEditModule = async () => {
        try {
            const response = await fetch(`http://145.24.237.168:8000/learningModules/${moduleData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(moduleData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error("Update failed");

            setMessage("Module succesvol opgeslagen!");
        } catch (error) {
            console.error("Error updating module:", error);
            setMessage("Er is iets misgegaan bij het opslaan.");
        }
    };

    const handleDeleteModule = async () => {
        const confirmDelete = window.confirm(
            "Weet je zeker dat je deze module wilt verwijderen? Dit kan niet ongedaan worden gemaakt."
        );
        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://145.24.237.168:8000/learningModules/${moduleData.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                    },
                }
            );
            if (!response.ok) throw new Error("Delete failed");
            alert("Module succesvol verwijderd!");
            navigate("/leermodule");
        } catch (error) {
            console.error("Error deleting module:", error);
            alert("Er is iets misgegaan bij het verwijderen.");
        }
    };

    return(
        <>
            <div id="detailsLeermoduleContainter">
                <ButtonPurple alt={"Exit details page of [insert quiz name here]"} label={"Return"} onClick={() => navigate("/Leermodule")}></ButtonPurple>
                <h1>You're now checking out details of leermodule: {id}</h1>
                {/*div times amount of existing questions*/}
                <div id="questionsContainer">
                    {moduleData.questions.map((q, qIndex) => (
                        <div key={qIndex} className="questions_answers_container">
                            <div className="questions_container">
                            {/* Vraag input met label */}
                                <label htmlFor={`question-${qIndex}`}>Question {qIndex + 1}   </label>
                                <input type="text" id={`question-${qIndex}`} name={`question-${qIndex}`} placeholder="Type your question here" value={q.description} onChange={(e) => {
                                        const updatedModule = { ...moduleData };
                                        updatedModule.questions[qIndex].description = e.target.value;
                                        setModuleData(updatedModule);
                                    }}
                                />
                            </div>
                            {/* Antwoorden als radio buttons */}
                            <div className="answers_container">
                                <p>Antwoord: </p>
                                {q.answers.map((a, aIndex) => (
                                    <label key={aIndex} className="answer_label">
                                        <input type="radio" name={`question-${qIndex}`} checked={!!a.is_correct} onChange={() => {
                                                const updatedModule = { ...moduleData };
                                                updatedModule.questions[qIndex].answers.forEach(ans => (ans.is_correct = false));
                                                updatedModule.questions[qIndex].answers[aIndex].is_correct = true;
                                                setModuleData(updatedModule);
                                            }}
                                        />
                                        {`${a.username}`}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="buttons_container_details">
                        <ButtonPurple alt="edit module" label="Edit module" onClick={handleEditModule}/>
                        <ButtonBlack alt="Delete module" label="Delete leermodule" onClick={handleDeleteModule}/>
                    </div>
                </div>
            </div>
            {Message && (
                <div className="save-message">
                    {Message}
                </div>
            )}
        </>
    )
}

export default DetailsLeermodule