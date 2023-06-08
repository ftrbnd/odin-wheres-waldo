import React from 'react';
import styles from '../styles/LeaderboardTab.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function formattedTime (seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const LeaderboardTab = ({ data }) => {
    return (
        <>
            <div className={styles.columnNames}>
                <h3>Nickname</h3>
                <h3>Time</h3>
                <h3>Date</h3>
            </div>
            <ol className={styles.data}>
                {data.map(entry =>
                    <li key={entry.date.seconds} className={styles.entry}>
                        <div className={styles.user}>
                            {entry.avatar ? <img className={styles.userAvatar} src={entry.avatar} alt='custom user avatar' /> : <FontAwesomeIcon icon={faUser} />}
                            <p>{entry.nickname}</p>
                        </div>
                        <p>{formattedTime(entry.seconds)}</p>
                        <p>{new Date(entry.date.toDate()).toLocaleString()}</p>
                    </li>
                )}
            </ol>
        </>
    );
};

export default LeaderboardTab;