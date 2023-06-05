import React from 'react';
import UserHeader from './UserHeader';
import styles from '../styles/Nav.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Nav = () => {
    const { authUser } = useAuth();

    return (
        <div className={styles.Nav}>
            <nav>
                <Link to='/'>
                    <h1>Where's Waldo?</h1>
                </Link>
                <ul className={styles.links}>
                    <Link to='/leaderboard'>
                        <li>Leaderboard</li>
                    </Link>
                    {authUser ? (
                            <Link to='/user'>
                                <li><UserHeader /></li>
                            </Link>
                        ) : (
                            <Link to='/login'>
                                <li>Log In</li>
                            </Link> 
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
