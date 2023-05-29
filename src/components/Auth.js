import React, { useState } from 'react';
import { auth, googleProvider } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.error(e);
        }
    };

    const signInWithGoogle = async () => {
        try {
            signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.error(e);
        }
    };

    const logOut = async () => {
        try {
            signOut(auth);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <input type='email' placeholder='user@example.com' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick={logOut}>Sign Out</button>
        </div>
    );
};

export default Auth;
