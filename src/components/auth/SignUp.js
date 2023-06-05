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
        <div className={styles.SignUp}>
            <form className={styles.form} onSubmit={signUpUser}>
                <h2>Sign Up</h2>
                <label htmlFor='email'>Email</label>
                <input id='email' type='email' placeholder='user@example.com' onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor='pass'>Password</label>
                <input id='pass' type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit'>Sign Up</button>
            </form>
            <button onClick={e => signInUserWithGoogle(e)}>Sign up with Google</button>
            <p>Already have an account? <Link to='/login'>Log In</Link></p>
        </div>
    );
};

export default SignUp;
