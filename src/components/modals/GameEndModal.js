import React, { useRef, useState } from 'react';
import styles from '../../styles/GameEndModal.module.css';
import { useAuth } from '../../utils/AuthContext';
import { collection, addDoc } from "firebase/firestore"; 
import { firestore } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

const GameEndModal = ({ minutes, seconds }) => {
    const [nickname, setNickname] = useState('');
    const finalMinutes = useRef(minutes);
    const finalSeconds = useRef(seconds);

    const { authUser } = useAuth();

    const navigate = useNavigate();

    const submitToLeaderboard = async (e, nickname) => {
        e.preventDefault();

        const addToFirestore = async () => {
            try {
                await addDoc(collection(firestore, 'leaderboard'), {
                    nickname: authUser ? authUser.displayName : nickname,
                    seconds: finalSeconds.current,
                    date: new Date(),
                    avatar: authUser ? authUser.photoURL : ''
                });
            } catch (e) {
                console.error(e);
            }

            navigate('/leaderboard');
        };

        toast.promise(addToFirestore, {
            pending: 'Adding to leaderboard...',
            success: 'Leaderboard updated!',
            error: 'Failed to add to leaderboard...',
        }, {
            hideProgressBar: true,
            transition: Slide,
            draggablePercent: 60
        })
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
                    <label>You are not signed in! Choose a nickname:</label>
                    <input value={nickname} onChange={e => setNickname(e.target.value)} type='text' placeholder='Nickname' minLength={2} required />
                    <button type='submit' className={styles.ok}>OK</button>
                </form>)}
            </div>
        </>
    )
};

export default GameEndModal;