import { useState } from "react";
import { useNavigate } from "react-router";
import ButtonMain from "../buttons/ButtonMain.jsx";
import InfoButton from "../buttons/InfoButton.jsx";

import "./profile.css";

function Profile(){
    const navigate = useNavigate();
    const [Message, setMessage] = useState("");

    const handleSave = () => {
        setMessage("Opgeslagen!");
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div className="profile-container">
            <h1>Profile Settings</h1>
            <h3>Onze app maakt gebruik van HuggingFace AI. Geeft u toestemming om uw persoonsgegevens hiervoor te gebruiken?</h3>
            <div className="checkbox-container-info">
                <div>
                    <input type="checkbox" id="hugginface"/>
                    <InfoButton alt="InfoButton" label="InfoButton" onClick={() => (window.location.href = "https://huggingface.co/terms-of-service")}/>
                    <label htmlFor="hugginface">Geef toestemming om HuggingFace AI data te gebruiken</label>
                </div>
            </div>
            <br/>
            <h3>Onze app gebruikt data van de volgende onderdelen. Geeft u hiervoor toestemming?</h3>
            <div className="checkbox-container">
                <div>
                    <input type="checkbox" id="twitter"/>
                    <label htmlFor="twitter"> Geef toestemming om Twitter data te gebruiken</label>
                </div>
                <div>
                    <input type="checkbox" id="youtube"/>
                    <label htmlFor="youtube"> Geef toestemming om Spotify data te gebruiken</label>
                </div>
                <div>
                    <input type="checkbox" id="netflix"/>
                    <label htmlFor="netflix"> Geef toestemming om Netflix data te gebruiken</label>
                </div>
            </div>
            <ButtonMain text="Save" label="save" onClick={handleSave} />
            {Message && (
                <div className="save-message">
                    {Message}
                </div>
            )}
        </div>
    );
}

export default Profile;