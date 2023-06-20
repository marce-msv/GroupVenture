import './App.css';
import Root from './root';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {}, [isLoggedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Root setIsLoggedIn={setIsLoggedIn} />
      </BrowserRouter>
    </div>
  );
}

export default App;
