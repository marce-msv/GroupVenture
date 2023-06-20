import "./App.css";
import Root from "./root";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

 useEffect(() => {
  // console.log('Navbar updating for Log in / out ?');
  
 },[isLoggedIn])

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
