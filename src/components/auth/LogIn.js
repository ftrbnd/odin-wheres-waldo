import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, signInWithGoogle } = useAuth();

    const signInUser = async () => {
        await signIn(email, password);
    }

    const signInUserWithGoogle = () => {
        signInWithGoogle();
    }

    return (
        <div>
            <input type='email' placeholder='user@example.com' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signInUser}>Sign In</button>
            <button onClick={signInUserWithGoogle}>Sign in with Google</button>
        </div>
    );
};

export default SignIn;
