import "./family.css"
import BigButton from "../buttons/BigButton.jsx";
import InfoButton from "../buttons/InfoButton.jsx";
import {useNavigate} from "react-router";
function Family(){
    const navigate = useNavigate();
    return (
        <>
            <div className="family-container">
                <h1>Family AI</h1>
                <p>Dit is jou familie!</p>
                <img src="/family-ai-drawing.png" alt="Family AI" className="home-image"/>
                <h3>Hier kan je de informatie bekijken per familie lid</h3>
                <div className="family-buttons">
                    <BigButton alt="Vader" label="Vader" onClick={() => navigate("/Family")}/>
                    <BigButton alt="Moeder" label="Moeder" onClick={() => navigate("/Family")}/>
                    <BigButton alt="Zoon" label="Zoon" onClick={() => navigate("/Family")}/>
                    <BigButton alt="Dochter" label="Dochter" onClick={() => navigate("/Family")}/>
                </div>
            </div>
        </>
    )
}

export default Family