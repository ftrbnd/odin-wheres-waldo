import React, { useRef, useState } from 'react';
import styles from '../styles/GameEndModal.module.css';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';

const GameEndModal = ({ onClose, minutes, seconds }) => {
    const [nickname, setNickname] = useState('');
    const finalMinutes = useRef(minutes);
    const finalSeconds = useRef(seconds);

    const { authUser } = useAuth();

    const submitToLeaderboard = (e, nickname) => {
        e.preventDefault();

        // TODO: add stats to leaderboard via Firebase

        console.log(`${nickname} found all targets`);
    };

    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.GameEndModal}>
                <h2>Success!</h2>
                <p>You found all 3 targets in {String(finalMinutes.current).padStart(2, '0')}:{String(finalSeconds.current).padStart(2, '0')}</p>
                {authUser ? (
                    <p>Submit as <strong>{ authUser.displayName }</strong></p>
                ) : (<form onSubmit={e => submitToLeaderboard(e, nickname)}>
                    <label>
                        You are not signed in! Choose a nickname:
                        <input value={nickname} onChange={e => setNickname(e.target.value)} type='text' placeholder='nickname' minLength={5} />
                    </label>
                </form>)}
                <Link to='/leaderboard'>
                    <button onSubmit={e => submitToLeaderboard(e, nickname)} className={styles.ok}>OK</button>
                </Link>
            </div>
        </>
    )
};

export default GameEndModal;