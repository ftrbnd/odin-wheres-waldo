import React, { createContext, useContext, useEffect, useState } from "react";

export const TargetsContext = createContext();
export const useTargets = () => useContext(TargetsContext);

export const TargetsProvider = ({ children }) => {
    const [targets, setTargets] = useState();

    useEffect(() => {
        
    }, []);

    

    return (
        <TargetsContext.Provider value={{}}>
            { children }
        </TargetsContext.Provider>
    )
}