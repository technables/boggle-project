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


import {MessageType} from '../../data/constants';
import {ShowMessage} from '../../settings/showMessage';
import {MessageHelper} from '../../settings/messageHelper';


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
                        ShowMessage(MessageType.WELCOME,
                            MessageHelper(MessageType.WELCOME));
                    } else {
                        dispatch(failure(response.message));
                        ShowMessage(MessageType.ERROR,
                            response.message);
                    }
                } else {
                    let responseMsg = "no response";
                    dispatch(failure(responseMsg));
                    ShowMessage(MessageType.ERROR,
                        responseMsg);
                }
            }, err=>{
                dispatch(failure(err));
                ShowMessage(MessageType.ERROR,
                    err);
            }
            );


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
                if (res) {
                    if (res.success) {
                        if (res.data && res.data.is_correct) {
                            dispatch(evalSuccess(res));
                            ShowMessage(MessageType.SUCCESS,
                                MessageHelper(MessageType.SUCCESS));

                        } else {
                            dispatch(evalWrong(res));
                            ShowMessage(MessageType.WRONG,
                                MessageHelper(MessageType.WRONG));
                        }

                        if (onCorrect) onCorrect();
                    } else {
                        dispatch(evalFailure(res.message));
                        ShowMessage(MessageType.ERROR,
                            res.message);
                    }
                } else {
                    var msg = "error in process";
                    dispatch(failure(msg));
                    ShowMessage(MessageType.ERROR,
                        msg);
                }
            }, err => {
                dispatch(evalFailure(err));
                ShowMessage(MessageType.err,
                    err);
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