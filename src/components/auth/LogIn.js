import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import styles from '../../styles/LogIn.module.scss';
import { Link } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, signInWithGoogle } = useAuth();

    const signInUser = async (e) => {
        e.preventDefault();

        await signIn(email, password);

        e.target.reset();
    }

    const signInUserWithGoogle = async () => {
        await signInWithGoogle();
    }

    return (
        <div className={styles.LogIn}>
            <form className={styles.form} onSubmit={signInUser}>
                <h2>Log In</h2>
                <label>Email</label>
                <input type='email' placeholder='user@example.com' onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor='pass'>Password</label>
                <input id='pass' type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit'>Log In</button>
            </form>
            <button onClick={e => signInUserWithGoogle(e)}>Log in with Google</button>
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
    );
};

export default LogIn;
