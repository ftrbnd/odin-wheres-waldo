import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../utils/firebase';
import styles from '../styles/Leaderboard.module.css';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        async function fetchLeaderboard() {
            const data = [];

            const querySnapshot = await getDocs(collection(firestore, 'leaderboard'));
            querySnapshot.forEach(doc => {
                data.push(doc.data());
            });

            return data;
        }

        fetchLeaderboard().then(data => {
            data.sort((a, b) => (a.seconds > b.seconds) ? 1 : -1);
            setLeaderboard(data);
        });
    }, []);

    return (
        <div className={styles.Leaderboard}>
            <h2>Leaderboard</h2>
            <ol className={styles.data}> {
                leaderboard.map(entry =>
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
