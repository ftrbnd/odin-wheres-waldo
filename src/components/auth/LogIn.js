import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import styles from '../../styles/LogIn.module.css';
import { Link } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, signInWithGoogle } = useAuth();

    const signInUser = async (e) => {
        e.preventDefault();
        await signIn(email, password);
    }

    const signInUserWithGoogle = (e) => {
        e.preventDefault();
        signInWithGoogle();
    }

    return (
        <>
            <form className={styles.LogIn} onSubmit={signInUser}>
                <label>
                    Email
                    <input type='email' placeholder='user@example.com' onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type='submit'>Log In</button>
            </form>
            <button onClick={e => signInUserWithGoogle(e)}>Log in with Google</button>
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </>
    );
};

export default LogIn;
