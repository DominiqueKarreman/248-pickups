import { useState } from "react";
import Nav from "../components/Nav.js";
import FirstTime from "../components/FirstTime.js";
import Banner from "../components/Banner.js";
import Returning from "../components/Returning.js";
import "../App.css";

export default function Inschrijven() {
  const [focused, setFocused] = useState(null);
  // console.log(focused, "focussed div")
  console.log(window.location.pathname)
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <Banner />

        <FirstTime currentFocused={focused} setFocused={setFocused}/>
        <Returning currentFocused={focused} setFocused={setFocused}/>
      </header>
    </div>
  );
}
