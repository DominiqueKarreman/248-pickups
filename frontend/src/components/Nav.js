import React from "react";
import reactDOM from "react-dom";
import "../index.css"; 
import "../nav.css"; 

export default function Nav() {
  return (
    <div className="Nav">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </div>
  );
}