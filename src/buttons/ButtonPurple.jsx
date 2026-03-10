import React from "react";
import "./Buttons.css";

const ButtonPurple = ({ label, onClick }) => {
    return (
        <button className="button-purple" onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonPurple;