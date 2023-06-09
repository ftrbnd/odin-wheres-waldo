import React from "react";
import { render, screen } from "@testing-library/react";
import Login from '../components/auth/LogIn';


describe("Auth functions", () => {
    it("renders correct headings", () => {
        render(<Login />);
        
        const logInButton = screen.getByText('Log In');

        
    });

});