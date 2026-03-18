import React, { useState } from "react";
import "./Buttons.css";

function InfoButton({children}) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="info-button-wrapper">
            <button className="info-button" onClick={() => setShowPopup(!showPopup)}>i</button>
            {showPopup && (
                <div className="info-popup">
                    {children}
                </div>
            )}
        </div>
    );
}

export default InfoButton;