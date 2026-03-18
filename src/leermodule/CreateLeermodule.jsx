import '../App.css'
import '../index.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import './styleLeermoduleAdmin.css';
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
    let info = useParams();
    const result = Object.values(info);
    const navigate = useNavigate();
    const [Message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [themes, setThemes] = useState([]);
    const [themeId, setThemeId] = useState([null]);
    const [questions, setQuestions] = useState([]);
    const [radioErrors, setRadioErrors] = useState([]);

    // handle save
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = questions.map(q =>
            !q.answers.some(a => a.is_correct)
        );

        setRadioErrors(errors);

        const hasErrors = errors.some(e => e === true);
        if (hasErrors) {
            return;
        }

        const quiz = {
            name: name,
            description: description,
            theme_id: themeId,
            questions: questions.map(q => ({
                description: q.description || "No description",
                answers: q.answers.map(a => ({
                    user_id: a.user_id.toString(),
                    is_correct: !!a.is_correct
                }))
            }))
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
            setMessage("Opgeslagen!");
            navigate("/Leermodule");
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
                setUsers(filtered);
            })
            .catch(err => console.error(err));
    }, []);

    const createAnswersFromUsers = (users) =>
        users.map(user => ({
            user_id: user.id,
            is_correct: false
        }));

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

    // themes
    useEffect(() => {
        fetch("http://145.24.237.168:8000/themes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                const themesArray = Array.isArray(data) ? data : data.themes || [];
                setThemes(themesArray);
                if (themesArray.length > 0) setThemeId(themesArray[0].id);
            })
            .catch(err => console.error(err));
    }, []);

    // hele questions maken
    useEffect(() => {
        if (!themeId || themes.length === 0) return;

        const theme = themes.find(t => t.id === themeId);
        if (!theme) return;

        // hardcoded questions because db doesn't provide the whole question
        const autoQuestions = [
            {
                description: `Wie zijn lievelings film = ${theme.movie}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings film genre = ${theme.movie_genre}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings artiest = ${theme.artist}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings eten = ${theme.food}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings plaats = ${theme.place}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings muziek = ${theme.music}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings muziekgenre = ${theme.music_genre}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings Vakantieland = ${theme.holiday_country}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings kledingsstyle = ${theme.clothing_style}`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings dier = ${theme.animal}?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            },
            {
                description: `Wie zijn lievelings Kleur is =${theme.color} ?`,
                answers: users.map(u => ({ user_id: u.id, is_correct: u.id === 0 }))
            }
        ];
        setQuestions(autoQuestions);
    }, [themeId, themes, users]);

    return(
        <>
            <div id="createLeermoduleContainer">
                <ButtonPurple alt={"Exit details page of [insert quiz name here]"} label={"Return"} onClick={() => navigate("/Leermodule")}></ButtonPurple>
                <form action="" id={"createForm"} onSubmit={handleSubmit}>
                    <div id={"titleDataCreate"}>
                        <h1>Create new leermodule</h1>
                    </div>

                    <div id={"basicInfo"}>
                        <label htmlFor="qname">Name quiz</label>
                        <input type="text" id="qname" name="quizname" placeholder="Name of your quiz" value={name} onChange={(e) => setName(e.target.value)}/>

                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc" name="description" placeholder="Put your description here" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <hr/>
                    <h3>Hierin kan je een thema lijst met vragen kiezen en de juiste persoon als antwoord meegeven</h3>
                    <div className="theme_selection_container">
                        <select id="Theme" name="Theme" value={themeId || ""} onChange={(e) => setThemeId(Number(e.target.value))}>
                            {themes.length === 0 && <option value="">Loading themes...</option>}
                            {themes.map((theme) => (
                                <option key={theme.id} value={theme.id}>
                                    {theme.name || `Theme ${theme.id}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id="questionsContainerCreate">
                        {questions.map((q, qIndex) => (
                            <div key={qIndex}>
                                <p>{qIndex + 1}.</p>
                                {/* input disabled zodat user het niet kan wijzigen */}
                                <input type="text" value={q.description} disabled />

                                {/* Radio buttons voor antwoorden */}
                                {q.answers.map((answer, aIndex) => {
                                    const user = users.find(u => u.id === answer.user_id);
                                    const username = user ? (user.name || user.username || user.full_name) : "Loading...";

                                    return (
                                        <div key={aIndex} className="answers_checks">
                                            <label>
                                                <input type="radio" name={`question-${qIndex}`} checked={answer.is_correct} required
                                                    onChange={() => {
                                                        const updated = [...questions];
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
                                {radioErrors[qIndex] && (
                                    <p style={{ color: "red", marginTop: "0.25rem" }}>
                                        Je moet een antwoord selecteren voor deze vraag!
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <hr/>
                    {/*<div className="getBy_container">*/}
                    {/*    <div className="getBy_left">*/}
                    {/*        <input type="checkbox" id="getDataCheckbox" name="getDataCheckbox" value="true" defaultChecked="true"/>*/}
                    {/*        <label htmlFor="getDataCheckbox">Get by family data</label>*/}
                    {/*    </div>*/}

                    {/*    <select id="getBy" name="getBy">*/}
                    {/*        <option value="1">Highest scoring member</option>*/}
                    {/*        <option value="2">Lowest scoring member</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
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