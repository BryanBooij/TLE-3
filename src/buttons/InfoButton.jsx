import React from "react";
import "./Buttons.css";
function InfoButton({onClick}) {
    return (
        <button className="info-button" onClick={onClick}>i</button>
    );
}

export default InfoButton;