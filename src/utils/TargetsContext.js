import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { firestore } from '../utils/firebase';

export const TargetsContext = createContext();
export const useTargets = () => useContext(TargetsContext);

export const TargetsProvider = ({ children }) => {
    const targets = useRef([]);

    useEffect(() => {
        const data = [];

        async function fetchTargets() {
            const querySnapshot = await getDocs(collection(firestore, 'targets'));
            querySnapshot.forEach(doc => {
                data.push([doc.id, doc.data()]);
            });
        };
        
        fetchTargets();
        targets.current = data;
    }, []);

    return (
        <TargetsContext.Provider value={{targets}}>
            { children }
        </TargetsContext.Provider>
    )
}