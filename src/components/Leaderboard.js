import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useReducer } from 'react';
import { firestore } from '../utils/firebase';
import styles from '../styles/Leaderboard.module.css';
import LeaderboardTab from './LeaderboardTab';

const ACTIONS = {
    CENTRAL_PARK: 'Central Park',
    GREEN_GOBLIN: 'Green Goblin',
    MISTER_NEGATIVE: 'Mister Negative',
    VULTURE: 'Vulture',
    DISPLAY_CENTRAL_PARK: 'Display Central Park',
    DISPLAY_GREEN_GOBLIN: 'Display Green Goblin',
    DISPLAY_MISTER_NEGATIVE: 'Display Mister Negative',
    DISPLAY_VULTURE: 'Display Vulture'
};

function reducer(leaderboard, action) {
    switch (action.type) {
        case ACTIONS.CENTRAL_PARK:
            return {
                ...leaderboard,
                centralPark: {
                    ...leaderboard.centralPark,
                    data: [
                        ...leaderboard.centralPark.data
                            .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                        action.payload.data
                    ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
                }
            };
        case ACTIONS.GREEN_GOBLIN:
            return {
                ...leaderboard,
                greenGoblin: {
                    ...leaderboard.greenGoblin,
                    data: [
                        ...leaderboard.greenGoblin.data
                            .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                        action.payload.data
                    ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
                }
            };
        case ACTIONS.MISTER_NEGATIVE:
            return {
                ...leaderboard,
                misterNegative: {
                    ...leaderboard.misterNegative,
                    data: [
                        ...leaderboard.misterNegative.data
                            .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                        action.payload.data
                    ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
                }
            };
        case ACTIONS.VULTURE:
            return {
                ...leaderboard,
                vulture: {
                    ...leaderboard.vulture,
                    data: [
                        ...leaderboard.vulture.data
                            .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                        action.payload.data
                    ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
                }
            };
        case ACTIONS.DISPLAY_CENTRAL_PARK:
            return {
                ...leaderboard,
                centralPark: {
                    ...leaderboard.centralPark,
                    display: true
                },
                greenGoblin: {
                    ...leaderboard.greenGoblin,
                    display: false
                },
                misterNegative: {
                    ...leaderboard.misterNegative,
                    display: false
                },
                vulture: {
                    ...leaderboard.vulture,
                    display: false
                }
            };
        case ACTIONS.DISPLAY_GREEN_GOBLIN:
            return {
                ...leaderboard,
                centralPark: {
                    ...leaderboard.centralPark,
                    display: false
                },
                greenGoblin: {
                    ...leaderboard.greenGoblin,
                    display: true
                },
                misterNegative: {
                    ...leaderboard.misterNegative,
                    display: false
                },
                vulture: {
                    ...leaderboard.vulture,
                    display: false
                }
            };
        case ACTIONS.DISPLAY_MISTER_NEGATIVE:
            return {
                ...leaderboard,
                centralPark: {
                    ...leaderboard.centralPark,
                    display: false
                },
                greenGoblin: {
                    ...leaderboard.greenGoblin,
                    display: false
                },
                misterNegative: {
                    ...leaderboard.misterNegative,
                    display: true
                },
                vulture: {
                    ...leaderboard.vulture,
                    display: false
                }
            };
        case ACTIONS.DISPLAY_VULTURE:
            return {
                ...leaderboard,
                centralPark: {
                    ...leaderboard.centralPark,
                    display: false
                },
                greenGoblin: {
                    ...leaderboard.greenGoblin,
                    display: false
                },
                misterNegative: {
                    ...leaderboard.misterNegative,
                    display: false
                },
                vulture: {
                    ...leaderboard.vulture,
                    display: true
                }
            };
        default:
            return leaderboard;
    }
}

const Leaderboard = () => {
    const [leaderboard, dispatch] = useReducer(reducer, {
        centralPark: {
            data: [],
            display: true
        },
        greenGoblin: {
            data: [],
            display: false
        },
        misterNegative: {
            data: [],
            display: false
        },
        vulture: {
            data: [],
            display: false
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
    }, []);

    return (
        <div className={styles.Leaderboard}>
            <h2>Leaderboard</h2>
            <ul className={styles.tabs}>
                <li onClick={() => dispatch({ type: ACTIONS.DISPLAY_CENTRAL_PARK })}
                    className={`${leaderboard.centralPark.display && styles.activeTab}`}
                >Central Park</li>
                <li onClick={() => dispatch({ type: ACTIONS.DISPLAY_GREEN_GOBLIN })}
                    className={`${leaderboard.greenGoblin.display && styles.activeTab}`}
                >Green Goblin</li>
                <li onClick={() => dispatch({ type: ACTIONS.DISPLAY_MISTER_NEGATIVE })}
                    className={`${leaderboard.misterNegative.display && styles.activeTab}`}
                >Mister Negative</li>
                <li onClick={() => dispatch({ type: ACTIONS.DISPLAY_VULTURE })}
                    className={`${leaderboard.vulture.display && styles.activeTab}`}
                >Vulture</li>
            </ul>
            {leaderboard.centralPark.display && <LeaderboardTab data={leaderboard.centralPark.data} />}
            {leaderboard.greenGoblin.display && <LeaderboardTab data={leaderboard.greenGoblin.data} />}
            {leaderboard.misterNegative.display && <LeaderboardTab data={leaderboard.misterNegative.data} />}
            {leaderboard.vulture.display && <LeaderboardTab data={leaderboard.vulture.data} />}
        </div>
    );
};

export default Leaderboard;