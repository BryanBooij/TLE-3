import React from "react";
import "./Buttons.css";

const ButtonMain = ({ label, onClick }) => {
  return (
      <button className="button-main" onClick={onClick}>
          {label}
      </button>
  );
};

export default ButtonMain;