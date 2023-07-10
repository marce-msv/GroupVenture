import './App.css';
import Root from './root';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {}, [isLoggedIn]);

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <ToastContainer
          position='bottom-left'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <Root setIsLoggedIn={setIsLoggedIn} />
      </BrowserRouter>
    </div>
  );
}

export default App;
