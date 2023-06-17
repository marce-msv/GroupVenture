import "./App.css";
import Root from "./root";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Root setIsLoggedIn={setIsLoggedIn} />
      </Router>
    </div>
  );
}

export default App;
