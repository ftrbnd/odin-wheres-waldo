import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import App from "./App";
import Auth from "./components/Auth";
import Leaderboard from "./components/Leaderboard";
import UserDetails from "./components/UserDetails";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signin' element={<Auth />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/user' element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
