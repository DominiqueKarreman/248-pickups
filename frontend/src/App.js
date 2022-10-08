import Nav from "./components/Nav.js";
import FirstTime from "./components/FirstTime.js";
import Banner from "./components/Banner.js";
import Returning from "./components/Returning.js";
import Inschrijven from "./routes/Inschrijven.js";
import Spelers from "./routes/Spelers.js";
import "./App.css";
import Overzicht from "./routes/Overzicht.js";

function App() {
  let component;

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
