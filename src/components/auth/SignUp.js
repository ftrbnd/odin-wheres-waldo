import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, signInWithGoogle } = useAuth();

    const signUpUser = async () => {
        await signUp(email, password);
    };

    const signInUserWithGoogle = () => {
        signInWithGoogle();
    }

    return (
        <div>
            <input type='email' placeholder='user@example.com' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signUpUser}>Sign Up</button>
            <button onClick={signInUserWithGoogle}>Sign up with Google</button>
        </div>
    );
};

export default SignUp;
