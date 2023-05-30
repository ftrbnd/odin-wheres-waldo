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
                    <Link to='/signin'>
                    {
                        authUser ? (
                                <li><UserHeader /></li>
                        ) : (
                                <li>Sign In</li>
                        )
                    }
                    </Link>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
