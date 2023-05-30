import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import App from "./App";
import Leaderboard from "./components/Leaderboard";
import UserDetails from "./components/UserDetails";
import AuthPage from "./components/auth/AuthPage";
import { AuthProvider } from "./utils/AuthContext";

const RouteSwitch = () => {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/signin' element={<AuthPage />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/user' element={<UserDetails />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default RouteSwitch;
