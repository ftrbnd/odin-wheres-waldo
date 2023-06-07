import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../utils/firebase';
import styles from '../styles/Leaderboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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

    const formattedTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className={styles.Leaderboard}>
            <h2>Leaderboard</h2>
            <div className={styles.columnNames}>
                <h3>Nickname</h3>
                <h3>Time</h3>
                <h3>Image</h3>
                <h3>Date</h3>
            </div>
            <ol className={styles.data}>
                {leaderboard.map(entry =>
                    <li key={entry.date.seconds} className={styles.entry}>
                        <div className={styles.user}>
                            {entry.avatar ? <img className={styles.userAvatar} src={entry.avatar} alt='custom user avatar' /> : <FontAwesomeIcon icon={faUser} />}
                            <p>{entry.nickname}</p>
                        </div>
                        <p>{formattedTime(entry.seconds)}</p>
                        <p>{ entry.image }</p>
                        <p>{new Date(entry.date.toDate()).toLocaleString()}</p>
                    </li>
                )}
            </ol>
        </div>
    );
};

export default Leaderboard;
