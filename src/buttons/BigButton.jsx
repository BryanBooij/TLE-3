import React from "react";
import "./Buttons.css";

const BigButton = ({ label, onClick, isActive }) => {
    return (
        <button type="button" className={`big-button ${isActive ? "active-button" : ""}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default BigButton;