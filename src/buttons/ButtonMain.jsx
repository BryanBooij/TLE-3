import React from "react";
import "./Buttons.css";

const ButtonMain = ({ label, onClick, isActive, type }) => {
  return (
      <button type={type} className={`button-main ${isActive ? "active-button" : ""}`} onClick={onClick}>
          {label}
      </button>
  );
};

export default ButtonMain;