import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useReducer } from 'react';
import { firestore } from '../utils/firebase';
import styles from '../styles/Leaderboard.module.css';
import LeaderboardTab from './LeaderboardTab';

const ACTIONS = {
    CENTRAL_PARK: 'Central Park',
    GREEN_GOBLIN: 'Green Goblin',
    MISTER_NEGATIVE: 'Mister Negative',
    VULTURE: 'Vulture'
};

function reducer(leaderboard, action) {
    switch (action.type) {
        case ACTIONS.CENTRAL_PARK:
            return {
                ...leaderboard,
                centralPark: [
                    ...leaderboard.centralPark
                        .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                    action.payload.data
                ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
            };
        case ACTIONS.GREEN_GOBLIN:
            return {
                ...leaderboard,
                greenGoblin: [
                    ...leaderboard.greenGoblin
                        .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                    action.payload.data
                ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
            };
        case ACTIONS.MISTER_NEGATIVE:
            return {
                ...leaderboard,
                misterNegative: [
                    ...leaderboard.misterNegative
                        .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                    action.payload.data
                ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
            };
        case ACTIONS.VULTURE:
            return {
                ...leaderboard,
                vulture: [
                    ...leaderboard.vulture
                        .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                    action.payload.data
                ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
            };
        default:
    }
}

const Leaderboard = () => {
    const [leaderboard, dispatch] = useReducer(reducer, {
        centralPark: [],
        greenGoblin: [],
        misterNegative: [],
        vulture: []
    });

    useEffect(() => {
        async function fetchLeaderboard() {
            const querySnapshot = await getDocs(collection(firestore, 'leaderboard'));
            querySnapshot.forEach(doc => {
                dispatch({ type: doc.data().image, payload: { data: doc.data()} });
            });
        }

        fetchLeaderboard();
    }, []);

    return (
        <div className={styles.Leaderboard}>
            <h2>Leaderboard</h2>
            <ul className={styles.tabs}>
                <li>Central Park</li>
                <li>Green Goblin</li>
                <li>Mister Negative</li>
                <li>Vulture</li>
            </ul>
            <LeaderboardTab data={leaderboard.centralPark} />
            <LeaderboardTab data={leaderboard.greenGoblin} />
            <LeaderboardTab data={leaderboard.misterNegative} />
            <LeaderboardTab data={leaderboard.vulture} />
        </div>
    );
};

export default Leaderboard;
