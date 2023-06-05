import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import styles from '../../styles/SignUp.module.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, signInWithGoogle } = useAuth();

    const signUpUser = async (e) => {
        e.preventDefault();
        
        await signUp(email, password);
    };

    const signInUserWithGoogle = async () => {
        await signInWithGoogle();
    };

    return (
        <>
            <form className={styles.SignUp} onSubmit={signUpUser}>
                <label>
                    Email
                    <input type='email' placeholder='user@example.com' onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type='submit'>Sign Up</button>
            </form>
            <button onClick={e => signInUserWithGoogle(e)}>Sign up with Google</button>
            <p>Already have an account? <Link to='/login'>Log In</Link></p>
        </>
    );
};

export default SignUp;
