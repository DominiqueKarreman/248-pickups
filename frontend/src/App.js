import Nav from "./components/Nav.js";
import FirstTime from "./components/FirstTime.js";
import Banner from "./components/Banner.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <Banner />
        
        <FirstTime />
      </header>
    </div>
  );
}

export default App;
