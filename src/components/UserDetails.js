import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import styles from '../styles/UserDetails.module.scss';
import { Link } from 'react-router-dom';

const UserDetails = () => {
    const [customDisplayName, setCustomDisplayName] = useState(null);

    const { authUser, signOutUser, updateDisplayName } = useAuth();

    const updateName = async (e) => {
        e.preventDefault(); // comment to immediately see new name on Nav

        await updateDisplayName(customDisplayName);

        e.target.reset();
    }

    const signOut = async () => {
        await signOutUser();
    }

    return (
        <div className={styles.UserDetails}> { authUser ? (
            <div className={styles.page}>
                <h3>Settings</h3>
                <form onSubmit={updateName}>
                    <label htmlFor='name'>Display Name</label>
                    <input id='name' type="text" name="name" onChange={(e) => setCustomDisplayName(e.target.value)} />
                    <button type='submit'>Change</button>
                </form>
                <button onClick={signOut}>Sign Out</button>
            </div>) : (
                <Link to='/login'><p>Sign in to view your account</p></Link>
            )}
        </div>
    );
};

export default UserDetails;
