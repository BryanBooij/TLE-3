import { useState } from "react";
import ButtonMain from "../buttons/ButtonMain.jsx";
import InfoButton from "../buttons/InfoButton.jsx";

import "./profile.css";
import ButtonPurple from "../buttons/ButtonPurple.jsx";

function Profile(){
    const [Message, setMessage] = useState("");

    const handleSave = () => {
        setMessage("Opgeslagen!");
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div className="profile-container"> {/*⭐: Please use Id's in these situations!!!!*/}
            <h1>Profile Settings</h1>
            <div>
            <div className="checkbox-container">
                <div id="settings">
                    <div>
                        <h2>Accessibility</h2>
                        <div id="color_blind">
                            <div className="title_with_info">
                                <h3>Color blindness</h3>
                                <InfoButton alt="InfoButton" label="InfoButton">Dit is info voor color blindness</InfoButton>
                            </div>
                            <div id="colorOptionCharts">
                                <div className="piechartA"></div>
                                <div className="piechartB"></div>
                                <div className="piechartC"></div>
                            </div>
                        </div>
                        <div id="textChanges">
                            <div id="dyslectic">
                                <div className="title_with_info">
                                    <h4>Dyslectic</h4>
                                    <InfoButton alt="InfoButton" label="InfoButton">Dit is info voor Dyslectics</InfoButton>
                                </div>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div id="simplerText">
                                <div className="title_with_info">
                                    <h4>Simpler text</h4>
                                    <InfoButton alt="InfoButton" label="InfoButton">dit is info voor Simpler text</InfoButton>
                                </div>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <h2>Privacy</h2>
                        <div id={"privacySettings"}>
                            <div>
                                <div className="title_with_info">
                                    <p>Data</p>
                                    <InfoButton alt="InfoButton" label="InfoButton">Dit is onfo over data</InfoButton>
                                </div>
                            </div>
                            <div id="shareDataAdmins">
                                <div className="agreement_shareDataAdmins">
                                    <input type="checkbox" id="youtube"/>
                                    <label htmlFor="youtube"> Permission to use data from YouTube</label>
                                </div>
                                <div className="agreement_shareDataAdmins">
                                    <input type="checkbox" id="huggingFace"/>
                                    <label htmlFor="huggingFace"> Permission to share date with our partner Hugging Face</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="TermsAndData">
                    <div id="termsOfService">
                        <h2>Terms of service</h2>
                        <div className="buttons">
                            <ButtonPurple alt={""} label={"Reread Terms of Service"} onClick={() => window.location.href = "https://huggingface.co/terms-of-service"}></ButtonPurple>
                            <ButtonPurple alt={""} label={"Reread Privacy Policy"} onClick={() => window.location.href = "https://huggingface.co/privacy"}></ButtonPurple>
                        </div>
                    </div>
                    <div id="dataChart">
                        <h2>Data collection chart:</h2>
                        <div className="profile-chart-container">
                            <div className="center-label">100%</div>
                        </div>

                        <div className="legend">
                            <div className="legend-item">
                                <div className="legend-color instagram"></div>
                                Search history - 60%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color facebook"></div>
                                Watch history - 20%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color twitter"></div>
                                Data gathered from quizzes - 10%
                            </div>
                            <div className="legend-item">
                                <div className="legend-color snapchat"></div>
                                Own input - 10%
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