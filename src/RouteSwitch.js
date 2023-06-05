import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import App from "./App";
import Leaderboard from "./components/Leaderboard";
import UserDetails from "./components/UserDetails";
import { AuthProvider } from "./utils/AuthContext";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RouteSwitch = () => {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/user' element={<UserDetails />} />
          </Routes>
        </AuthProvider>
        <ToastContainer />
      </BrowserRouter>
  );
};

export default RouteSwitch;
