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

const leaderboardReducer = (state, action) => {
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

export { ACTIONS, leaderboardReducer };