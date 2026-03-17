import { useState } from "react";
import { useNavigate } from "react-router";
import ButtonMain from "../buttons/ButtonMain.jsx";
import InfoButton from "../buttons/InfoButton.jsx";

import "./profile.css";
import ButtonPurple from "../buttons/ButtonPurple.jsx";

function Profile(){
    const navigate = useNavigate();
    const [Message, setMessage] = useState("");

    const handleSave = () => {
        setMessage("Opgeslagen!");
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div className="profile-container"> {/*⭐: Please use Id's in these situations!!!!*/}
            <h1>Profile Settings</h1>
            <div>
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

                <div id="settings">
                    <div>
                        <h2>Accessability</h2>
                        <div id="color_blind">
                            <div className="title_with_info">
                                <h3>Color blindness</h3>
                                <InfoButton alt="InfoButton" label="InfoButton"></InfoButton>
                            </div>
                            <div id="colorOptionCharts">
                                <div className="piechart"></div>
                                <div className="piechart"></div>
                                <div className="piechart"></div>
                            </div>
                        </div>
                        <div id="textChanges">
                            <div id="dyslectic">
                                <div className="title_with_info">
                                    <h4>Dyslectic</h4>
                                    <InfoButton alt="InfoButton" label="InfoButton"></InfoButton>
                                </div>
                                <button id={"dyslecticBtn"}>OFF</button>
                            </div>
                            <div id="simplerText">
                                <div className="title_with_info">
                                    <h4>Simpler text</h4>
                                    <InfoButton alt="InfoButton" label="InfoButton"></InfoButton>
                                </div>
                                <button id={"simplerTextBtn"}>OFF</button>
                            </div>
                        </div>
                        <h2>Privacy</h2>
                        <div id={"privacySettings"}>
                            <div>
                                <div className="title_with_info">
                                    <p>Data</p>
                                    <InfoButton alt="InfoButton" label="InfoButton"></InfoButton>
                                </div>

                            </div>
                            <div id="shareDataAdmins">
                                
                            </div>
                            <div id={"huggingFaceAI"}>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div id="TermsAndData">
                    <div id="termsOfService">
                        <h2>Terms of service</h2>
                        <div className="buttons">
                            <ButtonPurple alt={""} label={"Reread Terms of Service"}></ButtonPurple>
                            <ButtonPurple alt={""} label={"Reread Privacy Policy"}></ButtonPurple>
                        </div>
                    </div>
                    <div id="dataChart">
                        <h2>Data collection chart:</h2>
                        <div className="chart-container">
                            <div className="center-label">100%</div>
                        </div>

                        <div className="legend">
                            <div className="legend-item">
                                <div className="legend-color instagram"></div>
                                Instagram - 60%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color facebook"></div>
                                Facebook - 20%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color twitter"></div>
                                Twitter - 10%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color snapchat"></div>
                                Snapchat - 10%
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
            <ButtonMain text="Save" label="save" onClick={handleSave}/>
            {Message && (
                <div className="save-message">
                    {Message}
                </div>
            )}
        </div>
    );
}

export default Profile;