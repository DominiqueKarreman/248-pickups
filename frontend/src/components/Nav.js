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
          <a href="/about">Spelers</a>
        </li>
        <li>
          <a href="/contact">Overzicht</a>
        </li>
      </ul>
    </div>
  );
}