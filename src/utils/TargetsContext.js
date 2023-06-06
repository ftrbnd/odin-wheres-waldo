import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from '../utils/firebase';

export const TargetsContext = createContext();
export const useTargets = () => useContext(TargetsContext);

export const TargetsProvider = ({ children }) => {
    const [targets, setTargets] = useState([]);

    useEffect(() => {
        async function fetchTargets() {
            const data = [];

            const querySnapshot = await getDocs(collection(firestore, 'targets'));
            querySnapshot.forEach(doc => {
                data.push([doc.id, doc.data()]);
            });

            return data;
        };
        
        fetchTargets().then(data => setTargets(data));
    }, []);

    return (
        <TargetsContext.Provider value={{targets}}>
            { children }
        </TargetsContext.Provider>
    )
}