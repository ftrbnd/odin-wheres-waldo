import React from 'react';
import { auth } from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/UserHeader.module.css';
import { Link } from 'react-router-dom';

const UserHeader = () => {
    return (
        <Link to='/user'>
            <div className={styles.UserHeader}>

                <p>{auth.currentUser.displayName || 'Hello'}</p>
                {
                    auth.currentUser.photoURL ? (
                        <img src={auth.currentUser.photoURL} alt='custom user avatar' />
                    ) : (
                        <FontAwesomeIcon icon={faUser} />
                    )
                }
            </div>
        </Link>
    );
};

export default UserHeader;
