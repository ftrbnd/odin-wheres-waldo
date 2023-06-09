import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useReducer } from 'react';
import { firestore } from '../utils/firebase';
import styles from '../styles/Leaderboard.module.css';
import LeaderboardTab from './LeaderboardTab';
import { useLocation } from 'react-router-dom';
import { ACTIONS, leaderboardReducer } from '../utils/leaderboardReducer';

const Leaderboard = () => {
    const location = useLocation();

    const [state, dispatch] = useReducer(leaderboardReducer, {
        centralPark: {
            data: [],
            display: location.state === ACTIONS.CENTRAL_PARK
        },
        greenGoblin: {
            data: [],
            display: location.state === ACTIONS.GREEN_GOBLIN
        },
        misterNegative: {
            data: [],
            display: location.state === ACTIONS.MISTER_NEGATIVE
        },
        vulture: {
            data: [],
            display: location.state === ACTIONS.VULTURE
        }
    });

    useEffect(() => {
        async function fetchLeaderboard() {
            const querySnapshot = await getDocs(collection(firestore, 'leaderboard'));
            querySnapshot.forEach(doc => {
                dispatch({ type: doc.data().image, payload: { data: doc.data()} });
            });
        }

        fetchLeaderboard();

        if (!location.state) dispatch({ type: ACTIONS.DISPLAY_CENTRAL_PARK });
    }, [location]);

    return (
        <div className={styles.Leaderboard}>
            <h2>Leaderboard</h2>
            <ul className={styles.tabs}>
                <li onClick={() => dispatch({ type: ACTIONS.DISPLAY_CENTRAL_PARK })}
                    className={`${state.centralPark.display && styles.activeTab}`}
                >Central Park</li>
                <li onClick={() => dispatch({ type: ACTIONS.DISPLAY_GREEN_GOBLIN })}
                    className={`${state.greenGoblin.display && styles.activeTab}`}
                >Green Goblin</li>
                <li onClick={() => dispatch({ type: ACTIONS.DISPLAY_MISTER_NEGATIVE })}
                    className={`${state.misterNegative.display && styles.activeTab}`}
                >Mister Negative</li>
                <li onClick={() => dispatch({ type: ACTIONS.DISPLAY_VULTURE })}
                    className={`${state.vulture.display && styles.activeTab}`}
                >Vulture</li>
            </ul>
            {state.centralPark.display && <LeaderboardTab data={state.centralPark.data} />}
            {state.greenGoblin.display && <LeaderboardTab data={state.greenGoblin.data} />}
            {state.misterNegative.display && <LeaderboardTab data={state.misterNegative.data} />}
            {state.vulture.display && <LeaderboardTab data={state.vulture.data} />}
        </div>
    );
};

export default Leaderboard;