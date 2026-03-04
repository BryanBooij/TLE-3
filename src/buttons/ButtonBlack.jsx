import React from "react";
import "./Buttons.css";

const ButtonBlack = ({ label, onClick }) => {
    return (
        <button className="button-header" onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonBlack;