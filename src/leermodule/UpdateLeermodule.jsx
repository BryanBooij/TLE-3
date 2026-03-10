import '../App.css'
import '../index.css'
import ButtonGreen from "../buttons/ButtonGreen.jsx";
import LeermoduleAdmin from "./LeermoduleAdmin.jsx";
import {useParams} from "react-router-dom";

function UpdateLeermodule() {
    let info = useParams(); // Access the route parameter;
    const result = Object.values(info); //make it into something usable for the html DOM

    return(
        <>
            <div id="detailsLeermoduleContainter">
                <h1>You're now editing leermodule: {result}</h1>
            </div>
        </>
    )
}

export default UpdateLeermodule