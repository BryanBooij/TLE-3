import React from "react";
import "./ButtonMain.css";

const ButtonMain = ({ label, onClick }) => {
  return (
      <button className="button-main" onClick={onClick}>
          {label}
      </button>
  );
};

export default ButtonMain;