import React from "react";
import "./Buttons.css";

const ButtonHeader = ({ label, onClick }) => {
    return (
        <button className="button-header" onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonHeader;