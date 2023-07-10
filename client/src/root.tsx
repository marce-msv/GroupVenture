import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddActivityPage from './pages/AddActivityPage/AddActivityPage';
import SignupPage from './pages/Authentication/SignupPage';
import LoginPage from './pages/Authentication/LoginPage';
import Profile from './pages/Profile/Profile';
import Logout from './pages/Authentication/Logout';
import Home from './pages/Home/Home';

import { Dispatch, SetStateAction } from 'react';

const Root = ({ setIsLoggedIn }: {setIsLoggedIn: Dispatch<SetStateAction<boolean>>}) => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/addactivity" element={<AddActivityPage />} />
    </Routes>
  );
  
};

export default Root;
