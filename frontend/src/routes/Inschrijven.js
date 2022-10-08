import Nav from "../components/Nav.js";
import FirstTime from "../components/FirstTime.js";
import Banner from "../components/Banner.js";
import Returning from "../components/Returning.js";
import "../App.css";

export default function Inschrijven() {
    
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <Banner />
        
        <FirstTime />
        <Returning />
      </header>
    </div>
  );
}
 
