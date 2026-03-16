import React from "react";
import "./Buttons.css";

const ButtonBlack = ({ label, onClick }) => {
    return (
        <button type="button" className="button-black" onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonBlack;