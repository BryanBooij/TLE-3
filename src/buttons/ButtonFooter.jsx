import React from "react";
import "./Buttons.css";

const ButtonFooter = ({ label, onClick }) => {
    return (
        <button className="button-footer" onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonFooter;