import {
    GAME_INIT,
    GAME_SUCCESS,
    GAME_FAILURE,
    EVALUATION_WRONG,
    EVALUATION_SUCCESS,
    EVALUATION_FAILURE,
    GAME_BACK,
    EVALUATION_INIT,
    GAME_CLEAR
} from '../../data/constants';

import {
    service
} from "../services";
import {
    Route_Board
} from "../../data/constants";

export const actionList = {
    initGame,
    processWord,
    clearBoard,
    back
};

function initGame(initObj, history) {

    return dispatch => {
         dispatch(gameinit());
        
        service.initGame(initObj)
            .then(response => {
                if (response) {
                    if (response.success) {
                        dispatch(success(response));
                        history.push(Route_Board);
                    } else {
                        dispatch(failure(response.message));
                    }
                } else {
                    let responseMsg = "no response";
                    dispatch(failure(responseMsg));
                }
            });


    }
}

function processWord(obj = {
    word: ''
}, onCorrect) {
    return dispatch => {
        dispatch(evalRequest({
            word: obj.word
        }));

        service.processWord(obj)
            .then(res => {
                debugger;
                if (res) {
                    if (res.success) {
                        if (res.data && res.data.is_correct) {
                            dispatch(evalSuccess(res));

                        } else {
                            dispatch(evalWrong(res));
                        }

                        if (onCorrect) onCorrect();
                    } else {
                        dispatch(evalFailure(res.message));
                    }
                } else {
                    var msg = "error in process";
                    dispatch(failure(msg));
                }
            }, err => {
                dispatch(evalFailure(err));
            });
    }
}

function clearBoard(){
    return dispatch =>{
        dispatch(request());
        service.back();
    }

    function request(){
        return {type: GAME_CLEAR};
    }
}

function back() {
    service.back();
    return {type: GAME_BACK}
}

function gameinit() {
    return { type: GAME_INIT };
  }

function success(msg) {
    return {
        type: GAME_SUCCESS,
        data: msg
    };
}

function failure(msg) {
    return {
        type: GAME_FAILURE,
        data: msg
    };
}

function evalRequest(msg){
    return {
        type: EVALUATION_INIT,
        data:msg
    };
}

function evalSuccess(msg) {
    return {
        type: EVALUATION_SUCCESS,
        data: msg
    };
}

function evalFailure(msg) {
    return {
        type: EVALUATION_FAILURE,
        data: msg
    };
}

function evalWrong(msg) {
    return {
        type: EVALUATION_WRONG,
        data: msg
    };
}