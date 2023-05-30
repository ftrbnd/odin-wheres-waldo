import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/UserHeader.module.css';
import { useAuth } from '../utils/AuthContext';

const UserHeader = () => {
    const { authUser } = useAuth();

    return (
        <div className={styles.UserHeader}>
            <p>{authUser?.displayName || 'Hello'}</p>
            { authUser?.photoURL ? <img src={authUser.photoURL} alt='custom user avatar' /> : <FontAwesomeIcon icon={faUser} />}
        </div>
    );
};

export default UserHeader;
