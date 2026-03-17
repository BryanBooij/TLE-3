import '../App.css'
import '../index.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import {useState} from "react";
import './styleLeermoduleAdmin.css';
import './addRemoveElement.js';
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
    const handleSave = () => {
        setMessage("Opgeslagen!");
        setTimeout(() => setMessage(""), 2000);
    };

    return(
        <>
            <div id="createLeermoduleContainer">
                <ButtonPurple alt={"Exit details page of [insert quiz name here]"} label={"Return"} onClick={() => navigate("/Leermodule")}></ButtonPurple>
                <form action="">
                    <div id={"titleDataCreate"}>
                        <h1>Create new leermodule</h1>
                        <select id="Theme" name="Theme">
                            <option value="1">Theme 1</option>
                            <option value="2">Theme 2</option>
                            <option value="3">Theme 3</option>
                            <option value="3">Theme 4</option>
                            <option value="3">Theme 5</option>
                            <option value="3">Theme 6</option>
                            <option value="3">Theme 7</option>
                            <option value="3">Theme 8</option>
                            <option value="3">Theme 9</option>
                            <option value="3">Theme 10</option>
                        </select>
                    </div>

                    <label htmlFor="qname">Name quiz</label>
                    <input type="text" id="qname" name="quizname" placeholder="Name of your quiz"/>

                    <label htmlFor="desc">Description</label>
                    <input type="text" id="desc" name="description" placeholder="Put your description here"/>

                    <div className="increaseDecreaseBtnsCreate">
                        <label htmlFor="questions">Questions</label>
                        <button id={"addQuestion"}>+</button>
                        <button id={"removeQuestion"}>-</button>
                    </div>
                    <div id="questionsContainerCreate">
                        <div>
                            <p>1.</p>
                            <input type="text" id="questionId" name="questions" placeholder="Question"/>
                        </div>
                        <div>
                            <p>2.</p>
                            <input type="text" id="questionId" name="questions" placeholder="Question"/>
                        </div>
                        <div>
                            <p>3.</p>
                            <input type="text" id="questionId" name="questions" placeholder="Question"/>
                        </div>
                    </div>

                    <div className="increaseDecreaseBtnsCreate">
                        <label htmlFor="answers">Answers</label>
                        <button id={"addAnswer"}>+</button>
                        <button id={"removeAnswer"}>-</button>
                    </div>
                    <div id={"answersContainer"}>
                        <div className={"answers_checks"}>
                            <input type="text" id="qname" name="quizname" placeholder="Answer"/>
                            <input type="checkbox" id="check1" name="check1" value=""/>
                        </div>
                        <div className={"answers_checks"}>
                            <input type="text" id="qname" name="quizname" placeholder="Answer"/>
                            <input type="checkbox" id="check2" name="check2" value=""/>
                        </div>
                        <div className={"answers_checks"}>
                            <input type="text" id="qname" name="quizname" placeholder="Answer"/>
                            <input type="checkbox" id="check3" name="check3" value=""/>
                        </div>
                    </div>
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
                    <ButtonMain text="Save" label="save" onClick={handleSave} />
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