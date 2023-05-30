import React from 'react';
import UserHeader from './UserHeader';
import styles from '../styles/Nav.module.css';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';

const Nav = () => {
    console.log(auth.currentUser);
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
                    {
                        auth.currentUser ? (
                            <li> <UserHeader /> </li>
                        ) : (
                            <Link to='/signin'>
                                <li>Sign In</li>
                            </Link>
                        )
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
