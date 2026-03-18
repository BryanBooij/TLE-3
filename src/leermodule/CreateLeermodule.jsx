import '../App.css'
import '../index.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import './styleLeermoduleAdmin.css';
// import './addRemoveElement.js';
import ButtonPurple from "../buttons/ButtonPurple.jsx";
import ButtonMain from "../buttons/ButtonMain.jsx";


/*
* name
* description
* theme
* times_played
* created_at
*
* questions
* answers
* */

function CreateLeermodule() {
    let info = useParams(); // Access the route parameter;
    const result = Object.values(info); //make it into something usable for the html DOM
    const navigate = useNavigate();

    // Message state for confirmation of saving changes, will disappear after 2 seconds
    const [Message, setMessage] = useState("");
    // state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [themeId, setThemeId] = useState(1);

    // handle save
    const handleSubmit = async (e) => {
        e.preventDefault();

        const quiz = {
            name,
            description,
            theme_id: themeId,
            questions
        };

        try {
            const res = await fetch("http://145.24.237.168:8000/learningModules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(quiz)
            });

            const data = await res.json();
            console.log(data);

            setMessage("Opgeslagen!");
            setTimeout(() => setMessage(""), 2000);

        } catch (err) {
            console.error(err);
            setMessage("Fout bij opslaan");
        }
    };

    // get users from db

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://145.24.237.168:8000/users")
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(user => user.id >= 1 && user.id <= 4);
                console.log("Users data:", filtered);
                setUsers(filtered);
            })
            .catch(err => console.error(err));
    }, []);

    const createAnswersFromUsers = (users) =>
        users.map(user => ({
            user_id: user.id,
            is_correct: false
        }));

    const [questions, setQuestions] = useState([
        { description: "", answers: [] },
        { description: "", answers: [] },
        { description: "", answers: [] }
    ]);

    useEffect(() => {
        if (users.length > 0) {
            const questionsWithAnswers = [0,1,2].map(() => ({
                description: "",
                answers: users.map(user => ({
                    user_id: user.id,
                    is_correct: false
                }))
            }));
            setQuestions(questionsWithAnswers);
        }
    }, [users]);



    return(
        <>
            <div id="createLeermoduleContainer">
                <ButtonPurple alt={"Exit details page of [insert quiz name here]"} label={"Return"} onClick={() => navigate("/Leermodule")}></ButtonPurple>
                <form action="" id={"createForm"} onSubmit={handleSubmit}>
                    <div id={"titleDataCreate"}>
                        <h1>Create new leermodule</h1>
                        <select id="Theme" name="Theme">
                            <option value="1">Theme 1</option>
                            <option value="2">Theme 2</option>
                            <option value="3">Theme 3</option>
                        </select>
                    </div>

                    <div id={"basicInfo"}>
                    <label htmlFor="qname">Name quiz</label>
                    <input type="text" id="qname" name="quizname" placeholder="Name of your quiz" value={name} onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor="desc">Description</label>
                    <input type="text" id="desc" name="description" placeholder="Put your description here" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    <hr/>

                    {/*<div className="increaseDecreaseBtnsCreate">*/}
                    {/*    <label htmlFor="questions">Questions</label>*/}
                    {/*    <div>*/}
                    {/*        <button id={"addQuestion"} className={"add_remove_btns"}>+</button>*/}
                    {/*        <button id={"removeQuestion"} className={"add_remove_btns"}>-</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <h3>Hierin kan je vragen opschrijven en de juiste persoon als antwoord meegeven</h3>
                    <div id="questionsContainerCreate">
                        {users.length > 0 && questions.map((q, qIndex) => (
                            <div key={qIndex}>
                                <p>{qIndex + 1}.</p>

                                <input
                                    type="text"
                                    placeholder="Question"
                                    value={q.description}
                                    onChange={(e) => {
                                        const updated = [...questions];
                                        updated[qIndex].description = e.target.value;
                                        setQuestions(updated);
                                    }}
                                />

                                {q.answers.map((answer, aIndex) => {
                                    const user = users.find(u => u.id === answer.user_id);
                                    const username = user ? (user.name || user.username || user.full_name) : "Loading...";

                                    return (
                                        <div key={aIndex} className="answers_checks">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${qIndex}`} // groep per vraag
                                                    checked={answer.is_correct}
                                                    onChange={() => {
                                                        const updated = [...questions];
                                                        // alleen deze vraag aanpassen
                                                        updated[qIndex] = {
                                                            ...updated[qIndex],
                                                            answers: updated[qIndex].answers.map((ans, i) => ({
                                                                ...ans,
                                                                is_correct: i === aIndex
                                                            }))
                                                        };
                                                        setQuestions(updated);
                                                    }}
                                                />
                                                {username}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <hr/>
                    <div className="getBy_container">
                        <div className="getBy_left">
                            <input type="checkbox" id="getDataCheckbox" name="getDataCheckbox" value="true"/>
                            <label htmlFor="getDataCheckbox">Get by family data</label>
                        </div>

                        <select id="getBy" name="getBy">
                            <option value="1">Highest scoring member</option>
                            <option value="2">Lowest scoring member</option>
                        </select>
                    </div>
                </form>
                {/* Uiterst belangrijk ik heb deze voor nu *BUITEN* de form gezet zodat de message duidelijk is voor de presentatie
                 dit moet later binnen de form geplaatst worden zodat de submit knop daadwerkelijk data verstuurd!!!!!*/}
                <div className={"Leermodule-save-button"}>
                    <ButtonMain text="Save" label="save" onClick={handleSubmit} />
                    {Message && (
                        <div className="save-message">
                            {Message}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CreateLeermodule