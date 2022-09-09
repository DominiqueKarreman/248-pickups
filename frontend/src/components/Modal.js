import React from "react";
import reactDOM from "react-dom";
import "../index.css"; 
import "../modal.css"; 

export default function Modal(props) {

    return (
        <div className={props.state}>
          <h1 id="modalMessage">{props.message}</h1>
        </div>
    );
}