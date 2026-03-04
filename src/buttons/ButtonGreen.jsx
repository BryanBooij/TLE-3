import React from "react";
import "./Buttons.css";

const ButtonGreen = ({ label, onClick }) => {
    return (
        <button className="button-green" onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonGreen;