import '../App.css'
import '../index.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import LeermoduleAdmin from "./LeermoduleAdmin.jsx";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import ButtonMain from "../buttons/ButtonMain.jsx";

function UpdateLeermodule() {
    let info = useParams(); // Access the route parameter;
    const result = Object.values(info); //make it into something usable for the html DOM
    const navigate = useNavigate();

    return(
        <>
            <div id="updateLeermoduleContainter">
                <h1>You're now editing leermodule: {result}</h1>
                <form action="">
                    <label htmlFor="qname">Name quiz</label>
                    <input type="text" id="qname" name="quizname" placeholder="Name of your quiz"/>

                    <label htmlFor="desc">Description</label>
                    <input type="text" id="desc" name="description" placeholder="Put your description here"/>

                    <label htmlFor="Theme">Theme</label>
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

                    <label htmlFor="questions">Questions</label>
                    <select id="questions" name="questions">
                        <option value="1">Question 1</option>
                        <option value="2">Question 2</option>
                        <option value="3">Question 3</option>
                        <option value="3">Question 4</option>
                        <option value="3">Question 5</option>
                        <option value="3">Question 6</option>
                        <option value="3">Question 7</option>
                        <option value="3">Question 8</option>
                        <option value="3">Question 9</option>
                        <option value="3">Question 10</option>
                    </select>

                    <label htmlFor="answers">Answers</label>
                    <div>
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
                    <div className={"getBy_container"}>
                        <input type="checkbox" id="getDataCheckbox" name="getDataCheckbox" value="true"/>
                        <label htmlFor="getBy">Get by familiy data</label><br/>
                        <select id="getBy" name="getBy">
                            <option value="1">Highest scoring member</option>
                            <option value="2">Lowest scoring member</option>
                        </select>
                    </div>
                    <ButtonMain alt={"submit"} label={"submit"} />
                </form>
            </div>
        </>
    )
}

export default UpdateLeermodule