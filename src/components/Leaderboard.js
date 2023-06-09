import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useReducer } from 'react';
import { firestore } from '../utils/firebase';
import styles from '../styles/Leaderboard.module.css';
import LeaderboardTab from './LeaderboardTab';
import { useLocation } from 'react-router-dom';

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

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.CENTRAL_PARK:
            return {
                ...state,
                centralPark: {
                    ...state.centralPark,
                    data: [
                        ...state.centralPark.data
                            .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                        action.payload.data
                    ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
                }
            };
        case ACTIONS.GREEN_GOBLIN:
            return {
                ...state,
                greenGoblin: {
                    ...state.greenGoblin,
                    data: [
                        ...state.greenGoblin.data
                            .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                        action.payload.data
                    ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
                }
            };
        case ACTIONS.MISTER_NEGATIVE:
            return {
                ...state,
                misterNegative: {
                    ...state.misterNegative,
                    data: [
                        ...state.misterNegative.data
                            .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                        action.payload.data
                    ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
                }
            };
        case ACTIONS.VULTURE:
            return {
                ...state,
                vulture: {
                    ...state.vulture,
                    data: [
                        ...state.vulture.data
                            .filter(data => data.date.seconds !== action.payload.data.date.seconds),
                        action.payload.data
                    ].sort((a, b) => (a.seconds > b.seconds) ? 1 : -1)
                }
            };
        case ACTIONS.DISPLAY_CENTRAL_PARK:
            return {
                ...state,
                centralPark: {
                    ...state.centralPark,
                    display: true
                },
                greenGoblin: {
                    ...state.greenGoblin,
                    display: false
                },
                misterNegative: {
                    ...state.misterNegative,
                    display: false
                },
                vulture: {
                    ...state.vulture,
                    display: false
                }
            };
        case ACTIONS.DISPLAY_GREEN_GOBLIN:
            return {
                ...state,
                centralPark: {
                    ...state.centralPark,
                    display: false
                },
                greenGoblin: {
                    ...state.greenGoblin,
                    display: true
                },
                misterNegative: {
                    ...state.misterNegative,
                    display: false
                },
                vulture: {
                    ...state.vulture,
                    display: false
                }
            };
        case ACTIONS.DISPLAY_MISTER_NEGATIVE:
            return {
                ...state,
                centralPark: {
                    ...state.centralPark,
                    display: false
                },
                greenGoblin: {
                    ...state.greenGoblin,
                    display: false
                },
                misterNegative: {
                    ...state.misterNegative,
                    display: true
                },
                vulture: {
                    ...state.vulture,
                    display: false
                }
            };
        case ACTIONS.DISPLAY_VULTURE:
            return {
                ...state,
                centralPark: {
                    ...state.centralPark,
                    display: false
                },
                greenGoblin: {
                    ...state.greenGoblin,
                    display: false
                },
                misterNegative: {
                    ...state.misterNegative,
                    display: false
                },
                vulture: {
                    ...state.vulture,
                    display: true
                }
            };
        default:
            return state;
    }
}

const Leaderboard = () => {
    const location = useLocation();

    const [state, dispatch] = useReducer(reducer, {
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
    }, []);

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