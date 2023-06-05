import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setAuthUser(user);
        });

        return unsubscribe;
    }, []);

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(`Successfully signed in user #${auth.currentUser.uid}`);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const signUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log(`Successfully signed up user #${auth.currentUser.uid}`);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log(`Successfully signed in user #${auth.currentUser.uid} via Google`);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const signOutUser = async () => {
        try {
            console.log(`Signing out user #${authUser.uid}...`);
            await signOut(auth);
            console.log(`Successfully signed out user.`);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    const updateDisplayName = async (name) => {        
        try {
            await updateProfile(auth.currentUser, {
                displayName: name
            });

            console.log(`Successfully updated new display name: ${authUser.displayName}`);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AuthContext.Provider value={{authUser, signIn, signUp, signInWithGoogle, signOutUser, updateDisplayName}}>
            { children }
        </AuthContext.Provider>
    )
}