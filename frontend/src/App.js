import Nav from "./components/Nav.js";
import FirstTime from "./components/FirstTime.js";
import Banner from "./components/Banner.js";
import Returning from "./components/Returning.js";
import Inschrijven from "./routes/Inschrijven.js";
import Spelers from "./routes/Spelers.js";
import PlayerDetails from "./routes/PlayerDetails.js";

import "./App.css";
import Overzicht from "./routes/Overzicht.js";
import OverzichtDetails from "./routes/OverzichtDetails.js";

function App() {
  let component;
  let substring = window.location.pathname.substr(0,9)
  let laststring = window.location.pathname.substr(9)
  let substring2 = window.location.pathname.substr(0,11)
  let laststring2 = window.location.pathname.substr(11)
  console.log(substring, "sub")
  
  switch (window.location.pathname) {
    case "/":
      component = <Inschrijven />;
      break;
    case "/Spelers":
      component = <Spelers />;
      break;
    case "/Overzicht":
      component = <Overzicht />;
      break;
    case `/Spelers/${laststring}`:
      component = <PlayerDetails player_id={laststring}/>;
      console.log("jajajajaj")
      break;
    case `/Overzicht/${laststring2}`:
      component = <OverzichtDetails date={laststring2}/>;
      console.log("jajajajaj")
      break;
      default:
        component = <Inschrijven />;
  
  }
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
    
        {component}
      </header>
    </div>
  );
}

export default App;
