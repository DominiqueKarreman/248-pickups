import React from "react";
import reactDOM from "react-dom";
import "../index.css"; 
import "../nav.css"; 

export default function Nav() {
  return (
    <div className="Nav">
      <ul>
        <li>
          <a href="/">Aanmelden</a>
        </li>
        <li>
          <a href="/Spelers">Spelers</a>
        </li>
        <li>
          <a href="/Overzicht">Overzicht</a>
        </li>
      </ul>
    </div>
  );
}