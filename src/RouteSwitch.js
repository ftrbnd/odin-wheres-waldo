import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import App from "./App";
import Auth from "./components/Auth";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signin" element={<Auth />} />
        </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
