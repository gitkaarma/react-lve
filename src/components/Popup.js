import React from "react";
import "./Popup.css";
import cross from "../assets/cross.png";
function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <img
        className="close-btn"
        onClick={() => props.setTrigger(false)}
        src={cross}
        alt="calendar"
      />
      <div className="popup-inner" id="rcorners">
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
