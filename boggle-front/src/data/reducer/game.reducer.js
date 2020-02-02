import config from '../../settings/config';
import {
    getUserData
} from '../../datastore';
import {
    GAME_INIT,
    GAME_FAILURE,
    GAME_SUCCESS,
    EVALUATION_INIT,
    EVALUATION_SUCCESS,
    EVALUATION_WRONG,
    EVALUATION_FAILURE,
    GAME_BACK,
    GAME_CLEAR
} from '../../data/constants';

export const initialState = {
    ...config,
    trials: 0,
    wrongAttempt: 0,
    currentUser: getUserData(),
    success: 0,
    in_game: false,
    wordList: {}
};

const game = (state = initialState, action) => {
    switch (action.type) {
        case GAME_INIT:
            return {
                ...state, in_game: true, currentUser: action.data
            };
        case GAME_SUCCESS:
            return {
                ...state, in_game: true, currentUser: action.data
            };
        case GAME_FAILURE:
            return {
                ...state, in_game: false, currentUser: null
            };
        case EVALUATION_INIT:
            let count = state.trials + 1;
            return {
                ...state, trials: count
            };
        case EVALUATION_WRONG:
            let wrongCount = state.wrongAttempt + 1;
            return {
                ...state, wrongAttempt: wrongCount
            };
        case EVALUATION_SUCCESS:
            let {
                word, data
            } = action.data;
            return {
                ...state,
                wordList: {
                    ...state.wordList,
                    [word]: data.score
                }
            };
        case EVALUATION_FAILURE:
            return state;
        case GAME_CLEAR:
            return {
                ...state, in_game: false, currentUser: null, trials: 0, wrongAttempt: 0, wordList: {}
            };
        case GAME_BACK:
            return {
                ...state, in_game: false, currentUser: null, trials: 0, wrongAttempt: 0, wordList: {}
            };
        default:
            return state;
    }
}


export default game;