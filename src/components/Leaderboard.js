import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react';
import { firestore } from '../utils/firebase';
import styles from '../styles/Leaderboard.module.css';

const Leaderboard = () => {
    const leaderboard = useRef([]);

    useEffect(() => {
        const data = [];

        async function fetchLeaderboard() {
            const querySnapshot = await getDocs(collection(firestore, 'leaderboard'));
            querySnapshot.forEach(doc => {
                data.push(doc.data());
            });
        }

        fetchLeaderboard();
        // sort data by shortest time:
        // data.sort((a, b) => (a.seconds > b.seconds) ? 1 : -1);
        leaderboard.current = data;
    }, []);

    return (
        <div className={styles.Leaderboard}>
            <h2>Leaderboard</h2>
            <ol className={styles.data}> {
                leaderboard.current.map(entry =>
                    <li key={entry.date.seconds} className={styles.entry}>
                        <p>Nickname: {entry.nickname}</p>
                        <p>Time: {entry.seconds}</p>
                        <p>Date: {entry.date.seconds}</p>
                    </li>
                )
            } </ol>
        </div>
    );
};

export default Leaderboard;
