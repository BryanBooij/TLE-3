import '../App.css'
import '../index.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import {useNavigate} from "react-router";

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
    const navigate = useNavigate()

    return(
        <>
            <div id="createLeermoduleContainter">
                <h1>Create a new learn module here!</h1>
            </div>
        </>
    )
}

export default CreateLeermodule